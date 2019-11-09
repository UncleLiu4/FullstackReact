import React from 'react'

const TotalCount = ({ parts }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
    const total = parts.reduce(reducer, 0)    
    return (
        <h4>total of {total} exercises</h4>
    )
}

export default TotalCount