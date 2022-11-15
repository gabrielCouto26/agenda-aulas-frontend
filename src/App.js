import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./views/register";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Container>
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
      </Container>
    </div>
  );
}

export default App;
