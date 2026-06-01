import './App.css';
import Home from './admin/pages/Home';
import AuthLayout from './auth/layouts/AuthLayout';
import { LoginPage } from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import AdminLayout from './admin/layouts/AdminLayout';
import { HomeCourse } from './courses/pages/HomeCourse';
import { SchoolLayout } from './shared/layouts/SchoolLayout';
import ProtectedRoute from './auth/components/ProtectedRoute';
import { TeacherLayout } from './shared/layouts/TeacherLayout';
import { HomeSubjectPage } from './subjects/pages/HomeSubjectPage';
import { HomeTeacherPage } from './teachers/pages/HomeTeacherPage';
import { HomeStudentPage } from './students/pages/HomeStudentPage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { HomeDashboard } from './dashboard-school/pages/HomeDashboard';
import { PointCategoryPage } from './point-categorys/pages/PointCategoryPage';
import { HomeAssignmentsPage } from './assignments/pages/HomeAssignmentsPage';
import { RegistryPointPage } from './registry-points/pages/RegistryPointPage';
import { HomeTeacherAdmin } from './admin-teacher/components/HomeTeacherAdmin';
import { PointCategoriesAssignmentsPage } from './point-categories-assignments/pages/PointCategoriesAssignmentsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to='/auth/admin'/>}/>

        <Route path='auth' element={<AuthLayout/>}>
          <Route index element={<LoginPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
        </Route>

        <Route path='admin/*' element={
            <ProtectedRoute>
              <AdminLayout/>
            </ProtectedRoute>
          }>
          <Route index element={<Home/>}/>
          <Route path='home' element={<Home/>}/>
        </Route>

        <Route path='school/*' element={
          <ProtectedRoute>
            <SchoolLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<HomeDashboard/>}/>
          <Route path='home' element={<HomeDashboard/>}/>
          <Route path='courses' element={<HomeCourse/>}/>
          <Route path='subjects' element={<HomeSubjectPage/>}/>
          <Route path='teachers' element={<HomeTeacherPage/>}/>
          <Route path='students' element={<HomeStudentPage/>}/>
          <Route path='assignments' element={<HomeAssignmentsPage/>}/>
        </Route>

        <Route path='teacher/*' element={
          <ProtectedRoute>
            <TeacherLayout/>
          </ProtectedRoute>
        }>
          <Route index element={<HomeTeacherAdmin/>}/>
          <Route path='home' element={<HomeTeacherAdmin/>}/>
          <Route path='registry-points' element={<RegistryPointPage/>}/>
          <Route path='point-categories' element={<PointCategoryPage/>}/>
          <Route path='point-categories-assignments' element={<PointCategoriesAssignmentsPage/>}/>
        </Route>

        <Route path='*' element={<Navigate to='/auth/login' />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
