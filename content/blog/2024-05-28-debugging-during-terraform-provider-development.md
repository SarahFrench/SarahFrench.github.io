---
title: "Debugging during Terraform provider development"
date: 2024-05-28T00:00:00.000Z
draft: false
tags: [
    "Terraform",
    "How-To"
]
params:
    summary: The one where we DELVE into the world of debugging providers in VS Code
---

My first experience of 'debugging' was using good old `console.log` in JavaScript code when I was first learning about programming. I'd like to think I've come a long way since then, but I was contributing to Terraform provider projects for an embrassingly long time before I introduced using a proper debugger into my work process. This blog is a way for me to share what I learned and hopefully help others (or just be a reference for myself in the future!).

## What's a Terraform provider?

For breivity, this blog doesn't explain what Terraform and Terraform providers are at great length. There are much [better resources out on the internet to explain them](https://developer.hashicorp.com/terraform/language/providers). Having said that, here's a short summary: In a nutshell, Terraform is an Infrastructure as Code (IaC) tool that lets users write declarative configuration code that describes resources in the 'real world' that they want to create. For example you might want to create an EC2 instance in AWS, or a new team in GitHub. When first provisioning and subsequently managing those resources Terraform interacts with third-party systems, such as AWS and GitHub, through Terraform providers. It's a bit of a simplification, but you can think of providers as an adapter between Terraform and third-party APIs. Terraform issues a command to providers to create a resource, and the provider handles what that creation process actually requires.

So, if Terraform providers are just simple adapters, what do you need to debug? Well...

## Why is a debugger needed?

In a perfect world, adding new functionality to a provider would be simple; it would only involve mapping data in the API to data in the Terraform representation of the resource. However APIs often have quirks that make it necessary to transform or manage data in a more complex way. For example, sometimes a resources cannot be managed in a purely declarative way through the API and there are imperative API endpoints that toggle a resource's state. To allow Terraform to manage the resource declarativly, the provider may need to interact with multiple API endpoints during a single create or update action. A simple example of this is [toggling whether a `google_cloud_scheduler_job` resource is paused or not](https://github.com/GoogleCloudPlatform/magic-modules/pull/6304/files). Using a debugger can help speed up adding new features (and exploring nasty bugs, too) when the provider needs to 'paper over cracks' with more code.

## First steps: Debugging during acceptance tests.

The best approach when adding a new feature to a Terraform provider is to create an acceptance test that tests the new feature you're adding, or asserts that in a given scenario a bug _no longer happens_. You then work to make the test pass.

If you wanted to check how the provider code is used during a given test you can run a specific test in debug mode.

```json
{
    "version" : "0.2.0",
    "configurations" : [
        {
            // Debug acceptance tests
            "name": "Debug Selected Acceptance Test",
            "request" : "launch",
            "type" : "go",
            "args" : [
                "-test.v",
                "-test.run",
                "^${}$"
            ],
            "mode" : "auto",
            "program" : "${fileDirname}",
            "envFile" : "${workspaceFolder}/.vscode/private.env",
            "showLog" : true
        }
    ]
}
```

## Next level: Running providers in debug mode for manual tests.

```json
{
    "version" : "0.2.0",
    "configurations" : [
        // Run provider in debug mode
        "name": "Start Provider in Debug Mode",
        "request" : "launch",
        "type" : "go",
        "mode" : "debug",
        "args" : [
            "-debug"
        ],
        "program" : "${workspaceFolder}",
        "envFile" : "${workspaceFolder}/.vscode/private.env",
        "showLog" : true
    ]
}
```
