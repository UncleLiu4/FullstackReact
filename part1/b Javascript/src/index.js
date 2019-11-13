import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.courseName}</h1>
    )
}

const Content = (props) => {    
    const [part1, part2, part3] = props.parts
    return (        
        <div>
            <Part part={part1} />
            <Part part={part2} />
            <Part part={part3} />
        </div>                    
    )      
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
    const count = props.parts.reduce(reducer, 0);
    return (
        <p>Number of exercises {count}</p>
    )
}

const App = () => {  
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const { name, parts } = course

  return (
    <div>
      <Header courseName={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))