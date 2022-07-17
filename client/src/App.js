import "./main.scss"
import Layout from "./components/Layout";
import { GlobalProvider } from './context/GolobalContext'

function App() {
  return (
    <GlobalProvider>
      <Layout />
    </GlobalProvider>
  );
}

export default App;
