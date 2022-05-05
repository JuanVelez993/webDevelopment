import StoreProvider from './StateManager/StoreProvider'
import Header from './components/Header'
import './App.css'

function App() {


  return (
    <div className="App">
      <StoreProvider>
        <Header/>
      </StoreProvider>
      
    </div>
  )
}

export default App
