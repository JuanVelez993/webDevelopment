import StoreProvider from './StateManager/StoreProvider'
import Header from './components/Header'
import Category from './components/Category'
import  {useState} from 'react'
import './App.css'

function App() {
  const [updated, setUpdated] = useState({ clicked: false, task: {} })


  return (
    <div className="App">
      <StoreProvider>
        <Header/>
        <Category updated={updated} setUpdated={setUpdated} />
      </StoreProvider>
      
    </div>
  )
}

export default App
