---
title: "Conway's Game of Life"
date: 2019-11-28T00:00:00+00:00
draft: false
tags: [
    "JavaScript",
    "Testing",
    "Frontend",
    "React",
]
---

<div style="display:flex;flex-direction:row;justify-content:center;">
<img class="" style="width:50%" src="https://res.cloudinary.com/dl1rwtqzi/image/upload/v1592240730/project-gifs/conway-game-of-life-TDD_gct5by.png">
<img class="" style="width:50%" src="https://res.cloudinary.com/dl1rwtqzi/image/upload/v1592239115/project-gifs/game-of-life-gif-downsized_xg43ma.gif">
</div>

## When?

~ November 2019

## Where?

- <a href="https://sarahfrench.github.io/react-game-of-life/">Hosted React visualisation of the project</a>

- <a href="https://github.com/SarahFrench/ConwayGameOfLife">Code on GitHub</a>

## What?

This project is an implementation of <a src="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a>, a 'game' that shows how a grid of cells that are either are alive or dead changes over time given: 1) a starting state of mixed cells, and 2) rule that define how a cells neighbours affects its status.

At the time I did this I was still doing my software development apprenticeship and only just learning about test-driven development. Much later, after I wrote the initial code and tests, I started teaching myself React and I revisited the project to create a visualisation of the game's steps.

## How?

My software development apprenticeship centred around JavaScript, so I used JavaScript for this project and the testing tools I'd encountered in lessons: chai assertion library and mocha testing framework.

### Code

The code itself is one mega-class called <span class="code-inline">GameOfLife</span>, lol:

```js
class GameOfLife {

  constructor(board){
    if(!this.initialStateValid(board)){
      throw new Error('Make sure the supplied board is a 2D array, with consistent row lengths');
    }

    this.currentState = board;
    this.largestYCoordinate = board.length - 1;
    this.largestXCoordinate = board[0].length - 1;
    
    ...

}
```

Looking at the code now in 2022 there is a lot I would change but I'm also happy at how I can understand the code well enough due to clear naming and comments!

### Testing

For the tests I had unit tests for different methods inside the class where I religiously used Given/When/Then commenting (I was so keen):

```js
describe("Determining who should die (shouldCellDie function)", function() {
  it("a single cell will die", function() {
    /*
      Given a game of life
      When there's a single live cell at the center
    */
    let board = [
      [0,0,0],
      [0,1,0],
      [0,0,0]
    ];
    let game = new Life(board);
    const cell = {x:1, y:1};

    // Then I expect to that the cell is meant to die
    let death = game.shouldCellDie(cell.x,cell.y);
    expect(death).to.be.true;

  })

  ...

}
```
<figcaption class="project-page__caption">
"I expect you to die Mr Bond"
</figcaption>

...and I also had some tests that tested different scenarios on a board, e.g what the next step of a game looks like with a given starting state.

```js
describe("Scenario 5: Grid with no live cells", function() {
// Very similar test to scenario 1
// I think scenario 1 was scoped to just one position, and this test looks at the whole board

  it("when the starting state has no live, no live appears following a turn", function() {
    // Given a game of life with the initial state containing no live cells
    let board = [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ];
    let game = new Life(board);

    // When the game evolves one turn
    game.takeTurn();

    // Then the next state also contains no live cells
    expect(game.searchForAnyLife()).to.be.false;
  })
})
```

## Why?

This task was as part of a job application (won't say where for!) but I was excited to complete it as Game of Life was something I had previously encountered when I was still studying Biosciences and was interested in programming. At that point, approx. 2015, I only knew basic Python and attempted to implement it, failing horribly. And didn't even know about testing at that point!