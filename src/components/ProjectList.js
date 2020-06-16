import React from "react"

import "./ProjectCard.css"

import { Card, Icon } from "semantic-ui-react"


export default function ProjectList() {
  return (
      <Card.Group
        className="ProjectList"
        stackable={true}
        style={{ marginTop: "1em", justifyContent: "center" }}
      >
        <Card
          className="ProjectList__item"
          image="https://res.cloudinary.com/dl1rwtqzi/image/upload/v1592242628/project-gifs/sudoku-downsized_w1iqkq.gif"
          header={
            <a href="https://sarahfrench.github.io/SudokuSolverVisualisation/">
              Sudoku Solver Visualisation
            </a>
          }
          meta="May 2020"
          description={
            <p>
              After{" "}
              <a href="https://github.com/SarahFrench/SudokuSolverRefactor">
                refactoring some old code
              </a>{" "}
              I wrote that solves Sudokus using a depth-first, brute force
              approach, I made a visualisation of the solving process.
            </p>
          }
          extra={
            <div>
              <Icon name="js square" />
              <Icon name="react" />
              <Icon name="node" />
            </div>
          }
        />
        <Card
          className="ProjectList__item"
          image="https://res.cloudinary.com/dl1rwtqzi/image/upload/v1592239115/project-gifs/game-of-life-gif-downsized_xg43ma.gif"
          header={
            <a href="https://sarahfrench.github.io/react-game-of-life/">
              Game of Life (React)
            </a>
          }
          meta="May 2020"
          description="I made a visualisation of my pre-existing Game of Life project to help get familiar with React."
          extra={
            <div>
              <Icon name="js square" />
              <Icon name="react" />
              <Icon name="node" />
            </div>
          }
        />
        <Card
          className="ProjectList__item"
          image="https://res.cloudinary.com/dl1rwtqzi/image/upload/v1592240730/project-gifs/conway-game-of-life-TDD_gct5by.png"
          header={
            <a href="https://github.com/SarahFrench/ConwayGameOfLife">
              Game of Life (TDD exercise)
            </a>
          }
          meta="November 2019"
          description="Implemented Conway's Game of Life using a TDD approach and mocha/chai testing npm packages."
          extra={
            <div>
              <Icon name="js square" />
              <Icon name="node" />
              <span> Mocha & Chai</span>
            </div>
          }
        />
      </Card.Group>
  )
}