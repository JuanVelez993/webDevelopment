import StoreProvider from './StateManager/StoreProvider'
import Header from './components/Header'
import Category from './components/Category'
import './App.css'

function App() {


  return (
    <div className="App">
      <StoreProvider>
        <Header/>
        <Category/>
      </StoreProvider>
      
    </div>
  )
}

export default App
