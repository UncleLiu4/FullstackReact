import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    // const now = new Date()
    // const a = 10
    // const b = 20
    const name = 'Peter'
    const age = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="George" age={26 + 10} />
            <Hello name={name} age={age} />
            {/* <p>Hello world, it is { now.toString() }</p>
            <p>
                {a} plus {b} is {a + b}
            </p> */}
        </div>
    )        
}
      
  
ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
