import React from 'react'

const Persons = ({ persons, delHandler }) => {
    const rows = () => persons.map(item => <p key={item.id}>
                                                {item.name} {item.number} 
                                                <button onClick={delHandler} data-id={item.id} data-name={item.name}>delete</button> 
                                            </p>)
    return(
        <div>
            {rows()}
        </div>
    )
}

export default Persons;