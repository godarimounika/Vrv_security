import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/*' element={<Dashboard/>}/>
    {/* <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/usermanagement' element={<UserManagement/>} />
    <Route  path='/rolemanagement'  element={<RoleManagement/>} /> */}
  </Routes>
  
  </BrowserRouter>

  </>
  );
}

export default App;
