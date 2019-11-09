import React from 'react'
import Header from './Header'
import Content from './Content'
import TotalCount from './TotalCount'

const Course = (props) => {    
    const { name, parts } = props.course     
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />      
            <TotalCount parts={parts} />
        </div>        
    )
}

export default Course