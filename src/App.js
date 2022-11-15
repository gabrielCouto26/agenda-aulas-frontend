import './App.css';
import routes from './routes';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./views/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Register/>} />
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  element={prop.component}
                  key={key}
                />
              );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
