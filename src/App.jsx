import { Routes, Route } from "react-router-dom"
import "./App.css";
import AllPlants from "./components/Plants/AllPlants";
import ApplicationViews from "./views/ApplicationViews";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  )
}

export default App;
