import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import Home from './pages/Home'
import Login from './pages/Login'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js'
import { useSelector } from 'react-redux'

const App = () => {
  // const { mode } = useSelector(state => state)
  // const theme = createTheme(themeSettings(mode), [mode])
  const theme = createTheme(themeSettings())
  const isAuth = Boolean(useSelector(state => state.token))

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={4}
            autoHideDuration={3000}
          >
            <CssBaseline />
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/home'>
                <Route index element={isAuth ? <Home /> : <Navigate to='/' />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
