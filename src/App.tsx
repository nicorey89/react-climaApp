import AppClima from "./components/AppClima"
import Header from "./components/Header"
import { ClimaProvider } from "./context/ClimaProvider"


function App() {

  return (
    <ClimaProvider>
      <Header />
      <AppClima/>
    </ClimaProvider>
  )
}

export default App
