import './App.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AllPage from './pages/AllPage'
import DonePage from './pages/DonePage'
import NotDonePage from './pages/NotDonePage'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.js'
// import { Home } from '@mui/icons-material'
// import { useSelector } from 'react-redux'

const App = () => {
  // const { mode } = useSelector(state => state)
  // const isAuth = Boolean(useSelector(state => state.token))
  // const theme = createTheme(themeSettings(mode), [mode])
  const theme = createTheme(themeSettings())

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home'>
              <Route index element={<HomePage />}/>
              <Route path='all' element={<AllPage />}/>
              <Route path='done' element={<DonePage />}/>
              <Route path='notdone' element={<NotDonePage />}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )
}

export default App
