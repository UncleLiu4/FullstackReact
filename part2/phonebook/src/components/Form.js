import React from 'react'

const Form = ({ newName, handleNameChange, newPhone, handlePhoneChange, addNewName }) => {
    return(
        <form onSubmit={addNewName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>number: <input value={newPhone} onChange={handlePhoneChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form;