---
title: "Viewports and broken media queries"
date: 2024-06-23T00:00:00.000Z
draft: false
---

Just now I was struggling with writing a basic media query in some CSS. I'd reduced the problem down to just trying to get the background colour be red when the page was <700px wide when using the responsive preview developer tool in Chrome and it just wasn't working, unless I made the max width much larger. Then a vague memory of "viewports" entered my mind...

tl;dr add this to the `<head>` of your HTML and bear in mind <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag#background" target="_blank">viewports don't always match the dimensions you're presented</a> as a viewer!

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```
