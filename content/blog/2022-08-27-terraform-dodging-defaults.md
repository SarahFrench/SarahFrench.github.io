---
title: "Using Terraform Providers: Dodging Default Behaviour"
date: 2022-08-27T00:00:00.000Z
draft: false
tags: [
    "Terraform",
    "Certifications",
]
---

# Contents

- [Intro](#intro)
- [Providers: what are they?](#providers-what-are-they)
- [The easiest way to get started using a provider](#whats-the-easiest-way-to-get-started-using-a-provider)
- [Adding version constraints](#how-do-i-let-terraform-know-what-version-of-the-provider-to-use)
- [Using multiple providers sharing the same name](#how-do-i-use-multiple-providers-with-the-same-name")
- [Using multiple versions of the same provider](#how-do-i-use-different-versions-of-the-same-provider"") (spoiler: you can't)
- [Extra: configuring one provider binary multiple ways](#extra-how-do-i-configure-a-single-provider-to-be-used-in-different-ways)
- [Downloading providers from places other than the public Registry](#how-do-i-get-providers-from-a-source-other-than-the-public-registry)

# Intro

I've used Terraform regularly for a while now and decided to consolidate my knowledge by studying for the [Terraform Associate Certification](https://www.hashicorp.com/certification/terraform-associate). I hoped this would identify gaps in my knowledge, as I've found that feeling like you've learned 'enough' is an easy trap to fall into when learning a new technology. You get comfortable with your incomplete-but-sufficient mental models of how things work and don't know what you don't know, until you encounter a bug that makes zero sense to you. Or you never realise there's a gap and you totally miss out on features!

During my process of finding my blind spots I realised that Terraform has a lot of default behaviours that 'just work' in the background. And that's great, but it also means there are whole aspects of the product that people may not fully got to grips with. For me, these knowledge gaps were around how providers are selected for download and use in a project; previous projects I worked on didn't have changing provider requirements, and the few changes that happened were handled by senior engineers behind closed doors. So, consider this post my version of a crash course on provider requirements.

The target reader of this post is someone who knows enough Terraform "to be dangerous" but hasn't explored all the features yet. I hope this post will surface ideas that less experienced practitioners haven't encountered fully and also supplement the documentation by describing an end goal and how you achieve it, versus me simply rehashing the official documentation. I link to the docs throughout the post and I encourage you to take a look!


<figure>
<iframe src="https://giphy.com/embed/iMBEgyXkFBtdCFS93i" width="100%" height="auto" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/afv-beach-jump-hole-iMBEgyXkFBtdCFS93i"></a></p>
<figcaption>
Let's dive in...
</figcaption>
</figure>


---

# Providers: what are they?

[Terraform is an infrastructure as code tool](https://www.terraform.io/intro#how-does-terraform-work) made by HashiCorp. Providers are modular plugins that allow Terraform to talk to more APIs, so you as a practitioner can provision and manage more _stuff_ in different places using Terraform.

The 'core' code of Terraform is mainly responsible for identifying differences between desired state and reality. It does this by comparing your project's declarative [configuration files](https://www.terraform.io/language) to the current status of resources as recorded in the [state file](https://www.terraform.io/language/state). If a change needs to take place, for example creating a new resource, Terraform instructs the provider to create it and doesn't need to know the exact details of how that is done.

Another responsibility of Terraform's core code is reading the configuration files and determining which providers are required, and then downloading the provider binary files. If those providers aren't downloaded then Terraform cannot manage infrastructure using them, right? Providers are first downloaded when initialising a working directory with the `terraform init` command. [Read about `terraform init` here](https://www.terraform.io/cli/init).

So now we've established all that... how do you actually start using providers?


## What's the easiest way to get started using a provider?

Getting started with Terraform is easy due to a lot of helpful default behaviours. Because of these defaults, you can get started provisioning infrastructure with surprisingly little configuration code.

Let's say I want to make a bucket in GCP. The most minimal configuration I'd need to achieve this is below. Note: I'd need to supply details like GCP credentials via ENV variables to make this work.


```hcl
# main.tf file

resource "google_storage_bucket" "my-bucket" {
  name          = "auto-expiring-bucket"
  location      = "US"
  force_destroy = true

  lifecycle_rule {
    condition {
      age = 3
    }
    action {
      type = "Delete"
    }
  }
```

Nowhere in the configuration do I explicitly say that I want to use the `google` provider for GCP, in general or specifically for this resource. Despite this, if I run `terraform init` the google provider is downloaded in preparation for provisioning the storage bucket.

How does this work? In the absence of other instructions, Terraform looks for a provider that shares a name with the first word of the resource type. So for `google_storage_bucket` it decides to go looking for a provider called `google`. It also assumes that we want to download the provider from the public Registry (https://registry.terraform.io/ ), and that the publisher of the provider is HashiCorp. Finally, if Terraform finds a provider that matches all those criteria, the latest version of the provider is picked by default.

From the minimal configuration above, Terraform knows to navigate the public Registry's API [to request details about available versions of the `google` provider under the `hashicorp` namespace](https://registry.terraform.io/v1/providers/hashicorp/google/versions), find the latest version and, begin downloading.

In summary, here are the defaults/assumptions affecting the configuration above:
- download source
- author name
- provider name
- version to download



## Isn't this good enough?

In short, no, it isn't 😅. These default behaviours are great to help people get up and running quickly when they first start using Terraform, but in the long term you'll have trouble relying on default behaviours. In terms of engineering decisions, your journey is only just beginning.

Relying on default behaviours without understanding how they work will make these scenarios difficult:

- What if you need to use a specific provider version, instead of the latest one?
- How would you use another author's `google` provider?
- What if you need to use different versions of a provider in the same Terraform project?
- What about using different configurations of the same provider in the same Terraform project?
- How can you download a provider from somewhere other than the public Registry, for example from your local disk?

I'll address these in the following sections!



## How do I let Terraform know what version of the provider to use?

In the scenario above, Terraform pulls down the latest version of the provider by default. That's fine if you're working alone, but if you share your project's configuration files with others you want to make sure they use the same version of the provider as you when they use the config files.

The first step towards this is committing the [dependency lock file](https://www.terraform.io/language/files/dependency-lock) in version control. This file is analagous to package.lock files used in JavaScript projects, or Gemfile.lock files in Ruby projects. It contains details that allows someone new to your project download the exact same versions of the providers you used when they run `terraform init` for the first time.

But imagine that time passes and you learn that one of the several providers you are using has a new feature that you'd like to use in your configuration. You run [`terraform init -upgrade`](https://www.terraform.io/cli/commands/init#plugin-installation) so that Terraform ignores the lock file and downloads the latest version of that provider, but- oops! That command actually causes _all of your providers_ to be upgraded to the latest release. This is risky; what if one of the providers has a breaking change in it? How would you return to the old version of one provider while keeping another provider upgraded to the new version?

Ideally we'd want to explicitly set versions for each provider individually, so the upgrade process can be more modular and controlled. To do this we can add in **version constraints** inside a new `terraform` configuration block in our configuration. This block lets us [configure how Terraform runs](https://www.terraform.io/language/settings) when using those specific configuration files but is not required for Terraform to work.

```hcl
# main.tf file

terraform {
    required_providers {
        google = {
            version = "~>4.1.0"
        }
    }
}

resource "google_storage_bucket" "my-bucket" {
    ...
}
```

Adding this snippet means that `terraform init -upgrade` can only upgrade providers within the version constraints explicitly defined in the configuration. An added benefit is that your commit history in version control has clearer evidence of past upgrade decisions and is more human-readable than the dependency lock file.

In summary, here are the defaults/assumptions affecting the configuration above:
- download source
- author name
- provider name
- ~~version to download~~ (we're one down!)



## How do I use multiple providers with the same name?

Suppose you've got a Terraform project that uses the mainstream Google provider in most places, but for a few resources you want to use a forked version of the provider that you published to the public Registry under `my-org`.

To use both providers in the same project, you can start by adding a `source` to the original `google` block in `required_providers`. This tells Terraform to download the first provider from the `hashicorp` **namespace** in the public Registry. Namespace essentially means the author that published the provider to the Registry.

Next, you can add a new block in `required_providers` that describes the new `google` provider's source and version constraints, too.

Here are those two changes:

```diff
# main.tf file

terraform {
    required_providers {
        google = {
+            source = hashicorp/google
            version = "~>4.1.0"
        }
+        google = {
+            source = my-org/google
+            version = "=1.3.0"
+        }
    }
}
# This won't work!
```

The configuration above is on the right track however there's a problem. There'll be an error about duplicate entries in `required_providers` because there are two keys called `google`.
 
The key for a given provider in the `required_providers` map is called the provider's [**local name**](https://www.terraform.io/language/providers/requirements#local-names). The local name doesn't _need_ to match the name of the provider, but if it does then it's said that the provider has its [**preferred local name**](https://www.terraform.io/language/providers/requirements#handling-local-name-conflicts).

Something really useful about Terraform is that if the local name of a provider matches the _preferred_ local name then Terraform will automatically use that provider to provision any resources where the resource type starts with that preferred local name. For example, when we provision our `google_storage_bucket` resource (or any `google_` resource) we don't need to explicitly label that resource as managed by the `google` provider. Terraform will look in all the loaded providers and find the provider using the matching local name. Easy peasy.

But now that we've got two providers called `google` it's very easy to break this convenient behaviour.

For example we could update the configuration this way so both providers have unique local names:

```diff
# main.tf file

terraform {
    required_providers {
-        google = {
+        hashicorp-google = {
            source = hashicorp/google
            version = "~>4.1.0"
        }
-        google = {
+        my-org-google = {
            source = my-org/google
            version = "=1.3.0"
        }
    }
}
```

This would solve the issue where Terraform complains about duplicate entries with the same name, but now neither of the providers have the preferred local name and Terraform won't automatically know which provider to use for our resources. We would need to add a [`provider` meta-argument](https://www.terraform.io/language/meta-arguments/resource-provider) to _every_ GCP resource in our project to tell Terraform which provider to use when managing it. That change could touch a lot of files and resources, depending on project size!

Assuming that the new `my-org/google` provider is used for a small subset of resources, you could leave the `hashicorp/google` provider with the preferred local name. That way, only that small subset of resources will need to have `provider = my-org-google` arguments added into their configuration blocks:

```hcl
# main.tf file

terraform {
    required_providers {
        google = {
            source = hashicorp/google
            version = "~>4.1.0"
        }
        my-org-google = {
            source = my-org/google
            version = "=1.3.0"
        }
    }
}

resource "google_storage_bucket" "my-bucket" {
    # No provider argument needed here
    ...
}

resource "google_storage_bucket" "bucket-made-with-my-provider" {
    provider = my-org-google
    ...
}
```

However [the official recommendation in the documentation](https://www.terraform.io/language/providers/requirements#:~:text=When%20this%20happens%2C%20we%20recommend%20combining%20each%20provider%27s%20namespace%20with%20its%20type%20name%20to%20produce%20compound%20local%20names%20with%20a%20dash) is to prepend local names of providers with the namespace. This would have the advantage of not assuming that contributors to your configuration have knowledge about preferred/non-preferred local names and would help avoid mistakes. It's your call!

In summary, here are the defaults/assumptions affecting the configuration above:
- download source
- ~~author name~~
- provider name - **now we're consciously using this assumption to our advantage**, but also explicitly overriding it with `provider`
- ~~version to download~~

## How do I use different versions of the same provider?

<figure>
<iframe src="https://giphy.com/embed/1kTUoVrBUh7psXaxDs" width="100%" height="auto" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/latenightseth-lol-seth-meyers-1kTUoVrBUh7psXaxDs"></a></p>
<figcaption>
This was a surprise to me too
</figcaption>
</figure>

You would think that this is handled in a similar way to the scenario above, but it's actually not possible to use multiple versions of the same provider (i.e different versions of a namespace + provider name combo) in the same configuration.

[Here's an answer in the Hashicorp Discuss forum](https://discuss.hashicorp.com/t/multiple-versions-of-same-provider-explicit-module-provider/20832) explaining why that is the case. Terraform only allows one version of a given provider to be used in your configuration, as this avoids issues when passing providers into modules.

## Extra: How do I configure a single provider to be used in different ways?

(This is 'extra' as it goes into how we use providers after they're downloaded, versus the rest of the post describing how to change provider installation behaviour)

When we define a list of providers in `required_providers` we are telling Terraform what binary files to download, from where and at what version. However, those provider binary may be configurable and allow Terraform to use the same provider to provision resources in different ways. Below is an example of configuring the google provider, taken from [the documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference):

```hcl
provider "google" {
  project     = "my-project-id"
  region      = "us-central1"
  zone        = "us-central1-c"
}
```

Here we are configuring default values for `project`, `region` and `zone` which can be used when provisioning resources (unless they are provided in the resource's config). The heading of the `provider` block references the provider via the local name used in `required_providers`, hence the label `"google"`.

If we wanted, we could make a second configuration of the provider that automatically passes in different values, e.g. European locations:

```hcl
provider "google" {
  project     = "my-project-id"
  region      = "us-central1"
  zone        = "us-central1-c"
}

provider "google" {
  alias       = "europe" # alias needed!
  project     = "my-project-id"
  region      = "europe-west2"
  zone        = "europe-west2-a"
}
```

An [`alias` meta-argument](https://www.terraform.io/language/providers/configuration#alias-multiple-provider-configurations) is needed because this is the second configuration of the same provider. This raises the question - how does Terraform know which configuration of the provider to use when managing a resource?

There's some more default behaviour to be aware of here. When a resource doesn't include a `provider` argument Terraform will then look for a provider with a matching preferred local name, as already discussed above. It will _also_ pull in the provider configuration that doesn't have an alias, as this is considered the [**default provider configuration**](https://www.terraform.io/language/providers/configuration#default-provider-configurations). A default provider configuration is present even in the absence of provider configuration blocks because ["Terraform assumes an empty default configuration for any provider that is not explicitly configured"](https://www.terraform.io/language/providers/configuration#provider-configuration-1)

If you want to use a non-default provider configuration to provision a resource instead then you need to add a `provider` meta-argument with a value of `<LOCAL NAME>.<ALIAS>`:

```hcl
resource "google_storage_bucket" "bucket-made-with-provider-alias" {
    provider = google.europe
    ...
}
```

It's important to think about your provider aliases as it can impact how providers are made accessible to modules. This is beyond the scope of this post, but for extra reading you can see how [implicit provider inheritance](https://www.terraform.io/language/modules/develop/providers#implicit-provider-inheritance) automatically makes all your default provider configurations available to child modules in your project. This is another default behaviour you might want to prevent by [explicitly passing in providers instead](https://www.terraform.io/language/modules/develop/providers#passing-providers-explicitly).

And finally, remember: aliases and local names are _separate_ but related concepts.

Ok, one last section to go!

## How do I get providers from a source other than the public Registry?

Of all the default behaviours I described at the start of this post, the only default behaviour we haven't addressed yet is where Terraform actually downloads providers from.

Terraform defaults to using the public Registry, but **private Registries** are also an option. This may be required if a company has created a provider to help manage resources using their private, internal APIs and they don't want details of their internal systems to be publically accessible.

In this scenario you can use a private Registry hosted in Terraform Cloud (TFC), or you can host your own Registry service. These two options behave just like the public Registry by implementing the ["Provider Registry Protocol"](https://www.terraform.io/internals/provider-registry-protocol), but users need the correct auth to access the providers published there.

The solution to this is understanding what a **registry source address** is. Registry source addresses are made of three parts -hostname, namespace, and provider- and are structured like `<HOSTNAME>/<NAMESPACE>/<PROVIDER>`. If this sounds familiar it's because we've already encountered source addresses when providing `source` arguments in `required_providers` within the `terraform` block:

```hcl
terraform {
    required_providers {
        google = {
            source  = hashicorp/google # This is <NAMESPACE>/<PROVIDER>
            version = "~>4.1.0"
        }
    }
}
```

The source argument here is not a "fully-qualified address" and is lacking the hostname. When the hostname is missing, Terraform assumes you want to use the public Registry and prefixes the source we provided with the hostname `registry.terraform.io`. The above source is equivalent to `registry.terraform.io/hashicorp/google`.

If we want to use a private Registry, all we need to do is include a non-default hostname in the `source` argument! For a private Registry in TFC we'd supply `app.terraform.io`, and if you created your own private Registry you'd supply your own hostname.


```hcl
terraform {
    required_providers {
        google = {
            source  = "app.terraform.io/hashicorp/google" # Using private Registry in TFC
            version = "~>4.1.0"
        }
    }
}
```

As the private Registry is private you would then need to configure the Terraform CLI with credentials for access. The CLI is configured by a single file, which on Mac is a `.terraformrc` file in a user's home directory. [There's a section in the documentation describing how to configure credentials for the CLI here](https://www.terraform.io/cli/config/config-file#credentials).

### Other options besides public/private Registries

There are other options besides Registries, but doing a deep dive into how they're configured is beyond the scope of this post. I'll summarise them quickly with links to documentation.

Both these options require configuration of the Terraform CLI itself, instead of explicit changes in the configuration files in your working directory. You set up your `required_providers` list in the same way as before.

[**Network mirrors**](https://www.terraform.io/cli/config/config-file#network_mirror) : these allow Terraform to download providers across a network connection from places that do not implement the "Provider Registry Protocol". Instead, they implement a simpler ["Provider Network Mirror Protocol"](https://www.terraform.io/internals/provider-network-mirror-protocol). These are appropriate if you don't want to use TFC's private Registries or implement a full Registry yourself. Version selection and using checksums is supported here.

[**Filesystem mirrors**](https://www.terraform.io/cli/config/config-file#filesystem_mirror) : these allow Terraform to get providers from a location on the local disk, and is useful if you run Terraform in a private cloud environment where access to the public internet is restricted. Version selection and using checksums is supported here.

## Conclusion

<figure>
<iframe src="https://giphy.com/embed/McHNcxIszjVStqZZ8s" width="100%" height="auto" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/foofighters-foo-fighters-studio-666-McHNcxIszjVStqZZ8s"></a></p>
<figcaption>
That's enough for one post!
</figcaption>
</figure>

I hope it has helped your understanding of Terraform and/or exposed you to keywords that weren't familiar to you before. All the contents of this post come from the Terraform documentation but I aim to have presented that information in a different way to try and help bring together concepts that are spread across different sections in the docs.

The post is jargon-heavy, so here's a summary of keywords and concepts in this post:

- version contraints
- (registry) source address
- hostname
- namespace
- provider
- fully-qualified source address = `<HOSTNAME>/<NAMESPACE>/<PROVIDER>`
- local name
- preferred local name
- default provider configuration
- alias


And here are concepts touched on but not explored fully in the post:

- [implicit provider inheritance by modules](https://www.terraform.io/language/modules/develop/providers#implicit-provider-inheritance)
- [explicit passing of providers to modules](https://www.terraform.io/language/modules/develop/providers#passing-providers-explicitly)
- [Provider Registry Protocol](https://www.terraform.io/internals/provider-registry-protocol)
- [Provider Network Mirror Protocol](https://www.terraform.io/internals/provider-network-mirror-protocol)
- [Network mirrors](https://www.terraform.io/cli/config/config-file#network_mirror)
- [Filesystem mirrors](https://www.terraform.io/cli/config/config-file#filesystem_mirror)
- [Developer overrides](https://www.terraform.io/cli/config/config-file#development-overrides-for-provider-developers)
