---
title: "Why static assets might 404 unexpectedly in Hugo projects"
date: 2024-06-02T00:00:00.000Z
draft: false
---

If you want to reference an image in the content of a Hugo website you cannot just add a new image to the static folder and hardcode the image's `src` in markdown. Hugo will only include assets if they are used in Hugo templating, like `{{ $go := resources.Get "image/go.jpeg" }}`.