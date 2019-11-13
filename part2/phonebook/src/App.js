import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import service from './services/service'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ searchText, setSearchText ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState({ 
    msg: '', 
    isError: false 
  })

  const hook = () => {
    service.getAll()
      .then(initialNotes =>setPersons(initialNotes))
      .catch(err => console.log('err', err))
    }

  useEffect(hook, [])

  const updateErrMsg = (obj) => {    
    setErrorMessage(obj)
    setTimeout(() => {
      setErrorMessage({msg: '', isError: false})
    }, 5000) 
  }

  const addNewName = (event) => {
    event.preventDefault()
    const t = persons.filter(elem => elem.name === newName)       
    if(t.length !== 0) {
      const m = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if(m) {
        const o = { name: newName, number: newPhone }
        service.update(t[0].id, o).then(returnedNote => {              
          updateErrMsg({ msg: `Added ${returnedNote.name}`, isError: false })
          // 本地也要删除
          const p = persons.filter(elem => elem.id !== Number(t[0].id))
          setPersons(p.concat(returnedNote))
        }).catch(err => console.log('err', err))
      }
    } else {
      const o = { name: newName, number: newPhone }
      service.create(o).then(returnedNote => {  
        updateErrMsg({ msg: `Added ${returnedNote.name}`, isError: false })
        setPersons(persons.concat(returnedNote))        
      }).catch(err => console.log('err', err))
    }  
    setNewName('')    
    setNewPhone('')
  }

  const Notification = ({ message }) => {    
    const { msg, isError } = message
    const notificationStyle = {
      color: isError ? 'red' : 'green',
      backgroundColor: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }
    if (msg === '') {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {msg}
      </div>
    )
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleSearch = (event) => {
    const t = event.target.value
    setSearchText(t)        
    if(t !== '') {
      setPersons(persons.filter( item => item.name.toUpperCase().includes(searchText.toUpperCase()) ))
    }
  }
  const delHandler = (event) => {
    const d = event.target.dataset
    const t = window.confirm(`Delete ${d.name} ?`)
    const name = d.name
    if(t) {
      const id = d.id
      service.delObj(id)
        .then(response => {          
          const t = persons.filter( item => item.id !== Number(id) )      
          setPersons(t)
        })
        .catch(err => {
          console.log('del err', err)
          updateErrMsg({msg: `${name} has already been removed from server`, isError: true})
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <Notification message={errorMessage} />
      <h2>Add a new note</h2>
      <Form newName={newName} handleNameChange={handleNameChange} 
            newPhone={newPhone} handlePhoneChange={handlePhoneChange}
            addNewName={addNewName} />
      <h2>Numbers</h2>
      <Persons persons={persons} delHandler={delHandler} />
    </div>
  )
}

export default App