---
title: "How to debug dependencies in Go projects"
date: 2024-06-19T00:00:00.000Z
draft: false
---

## Debugging dependencies

If you want to debug how a dependency is used in a Go project run `go mod vendor` to download all your projects dependencies to a `vendor` folder in your project. You can then add breakpoints to the vendored code just like your project code.


## Replacing dependencies with your forks

If you're working on a contribution to a dependency (for example fixing a bug you've discovered) then you might want to test that out locally with your project. To do this you can use the `replace` keyword in your go.mod file.

Today I wanted to test a change to how sweepers are filtered in the hashicorp/terraform-plugin-sdk module, as part of my work on the Google Terraform provider. The snippet below shows how I replaced use of `hashicorp/terraform-plugin-sdk` with my fork of that module containing a change. In the go,mod file I specify a commit containing an idea for a contribution/bug fix (<a href="https://github.com/SarahFrench/terraform-plugin-sdk/commit/d188bcc3c75e66bd775b98fc512a5706ccf930e8" rel="noopener noreferrer nofollow" target="_blank">d188bcc</a>). That commit SHA is used below:

```
module github.com/hashicorp/terraform-provider-google-beta

go 1.21

require (
  ...
	github.com/hashicorp/terraform-plugin-sdk/v2 v2.33.0
  ...
)

// Use my fork of the hashicorp/terraform-plugin-sdk repository instead
replace github.com/hashicorp/terraform-plugin-sdk/v2 => github.com/SarahFrench/terraform-plugin-sdk/v2 d188bcc3c75e66bd775b98fc512a5706ccf930e8
```

After a quick `go mod tidy` this is changed to a valid reference, which in my case seems to take advantage of exissting tags in the repository; your milage may vary:

```diff
- replace github.com/hashicorp/terraform-plugin-sdk/v2 => github.com/SarahFrench/terraform-plugin-sdk/v2 d188bcc3c75e66bd775b98fc512a5706ccf930e8
+ replace github.com/hashicorp/terraform-plugin-sdk/v2 => github.com/SarahFrench/terraform-plugin-sdk/v2 v2.34.1-0.20240619163930-d188bcc3c75e
```

## Debugging the replaced dependencies

After adding `replace` to your go.mod file you can run `go mod vendor` again. In the vendor folder the directory structure will use the replaced dependency's name (vendor/github.com/hashicorp/terraform-plugin-sdk/... in my case) but the actual code inside will be the contents of your fork!

Using these steps I was able to find my contribution's regex needed to be <a href="https://github.com/SarahFrench/terraform-plugin-sdk/commit/8de2d85fb5cb52931e835c9bfe848737a492ecf0" rel="noopener noreferrer nofollow" target="_blank">updated to account for a suffix present on sweeper names</a>, which is used internally by the SDK code.
