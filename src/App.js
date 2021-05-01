import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const getLocalStorage = () => {
    const lista = localStorage.getItem('list')
      ? JSON.parse(localStorage.getItem('list'))
      : []
    return lista
  }
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: '',
  })

  const handleNoInput = () => {
    showAlert(true, 'danger', 'please enter value')
  }

  const handleEditing = () => {
    let item = list.find((item) => item.id === editID)
    item.title = name
    console.log(item)
    showAlert(true, 'success', 'item edited')
    setList([...list])
    setName('')
    setEditID(null)
    setName('')
    setIsEditing(false)
  }

  const handleNewItem = () => {
    showAlert(true, 'success', 'item added to the list')
    const newItem = {
      id: new Date().getTime().toString(),
      title: name,
    }
    setList((lista) => [...lista, newItem])
    setName('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('hihihi')
    if (!name) {
      handleNoInput()
    } else if (name && isEditing) {
      handleEditing()
    } else {
      handleNewItem()
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
    setName('')
    setEditID(null)
    setName('')
    setIsEditing(false)
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const item = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(item.id)
    setName(item.title)
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} editItem={editItem} removeItem={removeItem} />
          <button className="clear-btn" onClick={() => clearList()}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
