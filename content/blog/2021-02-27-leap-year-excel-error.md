---
title: "When is a leap year not a leap year? Don't ask Microsoft Excel"
date: 2021-02-27T13:35:00.000Z
draft: false
tags: [
    "Bugs",
]
---

Dates and times always have the potential to cause trouble in code; back in my apprenticeship, my teacher drove this point home by sharing a great article called <a href="https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time" rel="noopener noreferrer nofollow" target="_blank">Falsehoods programmers believe about time</a>. Since then I've been wary of working with data that relies heavily on dates. (If you cannot tell, this paragraph's job is to supply foreshadowing).

In a recent project at work, I've been collecting Covid-19 data from various government sources and consolidating them into one standardised collection. The best scenario is that a country's government has a well-documented API. Typically countries seem to publish daily PDFs or CSVs that keep having data appended to the bottom. The worst-case was a certain health ministry's website that would include yesterdays data in the homepage's HTML and then update the HTML the next day with the previous day's stats.

An interesting date problem I recently encountered was in the data from Belgium. Belgium publishes its Covid-19 data in an Excel file with separate pages for cases, deaths and tests data, and when parsing the file using some JavaScript I found that one of these pages was returning dates as a number instead of a string. This is because Excel uses the 1900 date system where dates are expressed, behind the scenes, as the number of days after the start of 1900. Ok then. I started writing a function to convert the number into a date string that matched the dates from the other pages.

```js
const convertExcelTimeToTimestamp = (dataValue) => {
    const DAYS_OFFSET = 25569; //days between start of 1900 and 1970
    const MILLISECONDS_IN_A_DAY = 86400000;
    const unixDate = (dateValue – DAYS_OFFSET) * MILLISECONDS_IN_A_DAY;
    const timestamp =  moment(unixDate).format('YYYY-MM-DD');
    return timestamp
}
```

The function subtracts the number of days between the start of 1900 and 1970 from the input, to get the date in +/- days relative to 01/01/1970. Multiplying this by the number of milliseconds in a day gets a Unix time value that's usable in JavaScript. To figure out the value of <span class= "code-inline">DAYS_OFFSET</span> I initially used an online date difference calculator to get the rough value and then relied on a unit test to check it's correct. I took the first 1900 date serial number from the Belgian Excel spreadsheet, 43891, and made a test asserting that the function returned the date shown in Excel, “2020-03-01”. Cool, test passes, done.

But then I ended up in a confusing loop when I began adding more unit tests.

The definition of the 1900 date system said that it starts with 1 = 01/01/1900, so I made a unit test to assert this. But that test failed due to an out-by-one error. Confused, I then adjusted the function's calculations to make that test pass, but this then caused the tests for dates in 2020 to start failing with an out-by-one error instead. This left me scratching my head... why would the function work differently at low and high input values?

```
Expected: “1900-01-01”
Received: “1899-12-31”
```

Turns out my error was trusting Excel. For historical reasons, Excel has to support a bug where 1900 is falsely believed to be a leap year. This means that Excel believes there's an extra day between 01/01/1900 and 01/01/1970, impacting the value of <span class= "code-inline">DAYS_OFFSET</span> in my function. It works fine for recent dates, but if I use the function for dates before the fictional leap day 29/02/1900 then the offset value is incorrect and I get an out by one error.

The moral of the story - think about whether your unit tests cover scenarios or edge cases that _will_ occur in your app, and don't add unneeded unit tests. The project I'm working on was never going to receive dates from the early 1900s and if I hadn't begun adding unnecessary tests I wouldn't have stumbled on this confusing error and spent 30 minutes questioning the space-time continuum.