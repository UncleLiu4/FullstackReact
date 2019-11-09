import React from 'react'
import Course from './Course'

const RenderCourse = (props) => {
    const [...course] = props.course        
    const rows = () => course.map( elem => <Course key={elem.id} course={elem} /> )
    return (
        <div>{rows()}</div>
    )
}

export default RenderCourse