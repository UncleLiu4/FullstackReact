import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handler }) => {
    return (
        <div>
            <button onClick={handler}>{text}</button>            
        </div>
    )
}

const DisplayVotes = ({ currentSelected, count }) => <div>has {count[currentSelected]} votes</div>

const DisplayMaxVotes = ({ text, count, anecdotes }) => {
    let maxCount = 0, maxIndex = 0
    const a = Object.keys(count)    
    for(const index of a) {
        const c = count[index]
        if(c > maxCount) {
            maxIndex = index
            maxCount = c
        }
    }
    return (
        <div>
            <h1>{text}</h1>
            <p>{anecdotes[maxIndex]}</p>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [count, setCount] = useState({
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
  })
  const [random, setRandom] = useState(0)

  const clickHandler = () => {
    const nextRandom = getRandomInt(6)
    setRandom(nextRandom)
    setSelected(nextRandom)  
  }
  const voteHandler = () => {
      const nextVal = count[random] + 1
      const newCount = {
        ...count,
        [random]: nextVal,
      }      
      setCount(newCount)
  }
  return (
    <div>
      {props.anecdotes[selected]}      
      <DisplayVotes currentSelected={selected} count={count} />      
      <Button text='vote' handler={voteHandler} />
      <Button text='next anecdote' handler={clickHandler} />
      <DisplayMaxVotes text='Anecdote with most votes' count={count} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)