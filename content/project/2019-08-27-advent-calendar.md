---
title: "Advent Calendar 2019"
date: 2019-08-27T00:00:00+01:00
draft: false # TODO
tags: [
    "JavaScript",
    "Ruby on Rails",
    "Frontend",
    "SVG",
    "Cringe",
]
image: "image/advent-calendar.png"

---

<p class="notice"><em>Note</em>: With the end of Heroku's Free Tier came the end of this project :'( , however I've copied some of the static pages over to <a href="https://sarahfrench.dev/silly-pages/">https://sarahfrench.dev/silly-pages</a></p>

## What on Earth...

This, my friends, was the first 'big' project I started and completed as a junior developer. It's a advent calendar for 2019 which allowed the user (my boyfriend) to open up a new page each day between December 1st-25th, and each day is a little nugget of madness.

By having 25 advent pages to fill, this project gave me the opportunity to try a ton of new things and helped me learn SO MUCH about frontend development and browser APIs. I also did some classic junior developer things like writing god foresaken, under-documented code that is not pretty to look back on years later. But, having said that, I've got so much affection for this website. It's a little relic of my time as a junior dev and the first Christmas between me and my soon-to-be husband.

## How does it work?

The user visits the homepage and is shown 25 tiles covering the screen (see image above). As the equivalent day passed in Dec 2019 the tiles became clickable and the linked pages were nolonger blocked by a redirect.

As tiles disappear they reveal an image in the background. What tiles have been clicked is stored in the browser's local storage, so a user returns to the website to find all windows to the background image are still open.

Each page has a self-contained joke/activity/<em>thing</em> to see each day, and you can view past days' pages by opening the menu in the top left.

## The stack

This project was made with Ruby on Rails as the backend and plain HTML and vanilla JavaScript for the frontend. This stack was used because A) my job then was at a place using Ruby on Rails and I needed more practice, and B) I didn't know any frontend frameworks and was learning plain old HTML and JavaScript as part of my apprenticeship.

The project is deployed using Heroku, and I learned how to deploy it while attending a Ruby meetup in London. Those were the days :)

## My takeaways

- Vanilla JavaScript needs to be planned out well when making things like games, vs just opening a menu!
- CSS can get sprawling and gross quickly without a system
- Free services like Heroku and Cloudinary are awesome
- Apple really doesn't like audio playing automatically in their browser
- Test stuff in different browsers even if you have an audience of 1-2!
- Again, plan things out before writing code and make cleaner commits!

## Highlights

### Truely unhinged stuff I did with audio

#### #1 : Farting Click Game

<a href="https://hugo-advent-calendar.herokuapp.com/days/7" rel="noopener noreferrer nofollow" target="_blank">Day 7 is a farting click game, so yeah...</a>

#### #2 : Surprise...

<img src="https://res.cloudinary.com/dl1rwtqzi/image/upload/v1656876580/advent-calendar-day-22.png"/>

Day 22 I'll leave as a surprise, <a href="https://hugo-advent-calendar.herokuapp.com/days/22" rel="noopener noreferrer nofollow" target="_blank">go see it here if you want to laugh</a>, but it taught me about how it's really hard to sync JavaScript events to playing audio. In the end I had an event listener the fired everytime there was an update to the timestamp on the playing audio (!) and depending on the range the timestamp fell in it triggered a CSS change to cause animations to change. You needed to use ranges because you weren't guaranteed to get the same timestamps each time the code ran!

```js
document.addEventListener('DOMContentLoaded', function(){
    let audio = document.getElementsByTagName('audio')[0];
    let curtain = document.getElementById('curtain');
    let dancers = document.getElementsByClassName('can-can__image');
    audio.addEventListener('timeupdate', function(){
        // console.log(audio.currentTime);
        if(audio.currentTime > 9.5 && audio.currentTime < 11){
          curtain.classList.add('curtain--up');
          for(let i=0; i < dancers.length; i++){
            dancers[i].classList.remove('hidden');
          }
        }
        // 1
        if(audio.currentTime > 20.5 && audio.currentTime < 21.0){
          swapToSpin(dancers);
        }
        if(audio.currentTime > 22.0 && audio.currentTime < 22.5){
          swapToDance(dancers);
        }

        ...
    }
})
```


### Learning about the browser APIs, dealing with Promises, and implementing infinite scroll from scratch

<a href="https://hugo-advent-calendar.herokuapp.com/days/14">Day 14 - Drawing App</a> : a simple drawing app using the Canvas API where you can save your drawing to a gallery

<a href="https://hugo-advent-calendar.herokuapp.com/days/19" rel="noopener noreferrer nofollow" target="_blank">Day 19 - 
Geolocation thingy</a> inspired by <a href="https://en.wikipedia.org/wiki/Overly_Attached_Girlfriend" rel="noopener noreferrer nofollow" target="_blank">Overly-Attached Girlfriend</a>
 : this is now broken as the MapBox API I used has had a breaking change since 2019 :( This page uses the Geolocation API to get the user, i.e. my boyfriend's, latitude and longitude and then passed those to the MapBox API to get the name of the place where my boyfriend was and then <a href="https://github.com/SarahFrench/AdventCalendar/blob/54d220641ea76cbc3567b69ed61f8720e02032c7/app/assets/javascripts/19-geolocation/geolocation.js#L36-L47" rel="noopener noreferrer nofollow" target="_blank">updates text on the page to be creepily specific</a>:


```js
    ...

    if(data.leftLondon && !data.nearLooe){
      return "You've left London? Finally!"
    } else if (data.nearLooe) {
      return "You've arrived!"
    } else if (locationString === "Kentish Town Road"){
      return "You're home, good. I can keep an eye on you with the secret cameras.";
    } else if (locationString === "Avondale Road"){
      return "You're down in Croydon? I miss you but...";
    } else {
      return `What are you doing in ${locationString}? Without me?? :( `
    }

    ...
```

<a href="https://hugo-advent-calendar.herokuapp.com/days/19" rel="noopener noreferrer nofollow" target="_blank">Day 3</a> was an infinite number of Samoyeds, thanks to the free <a href="https://dog.ceo/dog-api/" rel="noopener noreferrer nofollow" target="_blank">Dog API</a>


### Day 5 taught me how to _not_ write JavaScript

Day 5 was a game inspired by Only Connect, a gameshow on BBC TV. It was the biggest bundle of JavaScript logic I'd written and it's a monster. The experience taught me about how it's important to plan your code and recognise when you should pause new features and address tech debt!

