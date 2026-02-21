import './App.css';
import Home from './admin/pages/Home';
import AuthLayout from './auth/layouts/AuthLayout';
import { LoginPage } from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import AdminLayout from './admin/layouts/AdminLayout';
import ProtectedRoute from './auth/components/ProtectedRoute';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage/>}/>

        <Route path='auth' element={<AuthLayout/>}>
          <Route index element={<LoginPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
        </Route>

        <Route path='admin/*' element={<ProtectedRoute>
          <AdminLayout/>
        </ProtectedRoute>}>
          <Route index element={<Home/>}/>
          <Route path='home' element={<Home/>}/>
        </Route>

        <Route path='*' element={<Navigate to='/auth/login' />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
