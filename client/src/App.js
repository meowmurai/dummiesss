import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ThemeProvider,createTheme } from '@mui/material/styles';
import {CssBaseline} from '@mui/material'
//component
import ProtectedRoute from './routing/ProtectedRoute.js'
import Landing from './views/landing.js'
import AuthRoute from './views/auth/auth.js'
import Explore from './views/explore.js'
import Profile from './views/profile.js'
import Course from './views/course.js'
import Admin from './views/admin.js'
import Uploader from './views/upload.js'

import Navbar from './Components/navbar.js'
import Footer from './Components/Footer.js'
import {theme} from './theme.js'

import AuthContextProvider from './contexts/AuthContext';
import CourseContextProvider from './contexts/courseContext';
import UserContextProvider from './contexts/userContext';

function App() {
  return (
    <AuthContextProvider>
      <CourseContextProvider>
        <UserContextProvider>
          <ThemeProvider theme={theme}> 
            <div className="App">
              <CssBaseline/>
              <Router>
                <Navbar/>
                <Routes>
                  <Route path='/' element={<Landing/>}/>
                  <Route path='/login' element={<AuthRoute route='login'/>}/>
                  <Route path='/register' element={<AuthRoute route='register'/>}/>
                  <Route path='/logout' element={<AuthRoute route='logout'/>}/>
                  <Route path='/home'element={<Landing/>}/>
                  <Route path='/explore'element={<Explore/>}/>
                  <Route path='/profile'element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                  <Route path='/course/:id' element={<ProtectedRoute><Course/></ProtectedRoute>}/>
                  <Route path='/admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
                  <Route path='/admin/upload' element={<Uploader/>}/>
                </Routes>
                <Footer/>
              </Router>
            </div>
          </ThemeProvider>
        </UserContextProvider>
      </CourseContextProvider>
    </AuthContextProvider>
  );
}

export default App;
