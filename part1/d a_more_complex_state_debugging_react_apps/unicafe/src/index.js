import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ text }) => <h1>{ text }</h1>

const Button = ({ text, handler }) => {
  return (
    <button onClick = {handler}>{ text }</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if(good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given.</div>
    )
  }
  const all = good + neutral + bad
  const average = (good * 1 - bad) / all
  const positive = `${((good / all) * 100).toFixed(2)}%`
  return (
    <table>
      <Statistic text = 'good' value = { good } />
      <Statistic text = 'neutral' value = { neutral } />
      <Statistic text = 'bad' value = { bad } />
      <Statistic text = 'all' value = { all } />
      <Statistic text = 'average' value = { average } />
      <Statistic text = 'positive' value = { positive } />            
    </table>
  )
}

const Statistic = ({ text, value }) => <tr>{ text } { value }</tr>    

const App = () => {
  const titleText = "give feedback"
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandler = () => setGood(good + 1)
  const neutralHandler = () => setNeutral(neutral + 1)
  const badHandler = () => setBad(bad + 1)

  return (
    <div>
      <Title text = { titleText } />
      <br />
      <div>
        <Button text = "good" handler = { goodHandler } />
        <Button text = "neutral" handler = { neutralHandler } />
        <Button text = "bad" handler = { badHandler } />
      </div>
      <br />      
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))