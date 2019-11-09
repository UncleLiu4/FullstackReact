import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
    const rows = () => parts.map( elem => <Part name={elem.name} exercises={elem.exercises} key={elem.id} />)
    return (
        <div>{ rows() }</div>
    )
}

export default Content