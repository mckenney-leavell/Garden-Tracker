import { Routes, Route } from "react-router-dom"
import "./App.css";
import ApplicationViews from "./views/ApplicationViews";
import Login from "./auth/Login";
import { Authorized } from "./views/Authorized";
import Register from "./auth/Register";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

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
