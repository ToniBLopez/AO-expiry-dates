import {
  Box,
  IconButton,
  useTheme
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import AddDates from '../widgets/AddDates'
import Options from '../widgets/Options'
import { useState, memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../../state'

const Menu = () => {
  const theme = useTheme()
  const boxRef = useRef(null)
  const { page } = useSelector(state => state)
  const [isAddDatesOpen, setIsAddDatesOpen] = useState(false)
  const [isChooseAnOptionOpen, setIsChooseAnOptionOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAddDatesOpen) {
      setIsChooseAnOptionOpen(false)
    } else if (isChooseAnOptionOpen) {
      setIsAddDatesOpen(false)
    }
  }, [isAddDatesOpen, isChooseAnOptionOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        console.log('inside no click BottomMenu')
        setIsChooseAnOptionOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <Box
      ref={boxRef}
      sx={{
        display: 'flex',
        zIndex: 10,
        justifyContent: 'center'
      }}
    >
      {isChooseAnOptionOpen
        &&
        <Options />
      }
      <Box
        sx={{
          display: 'grid',
          position: 'fixed',
          gridTemplateColumns: '1fr 1fr',
          padding: '0px 40px',
          width: '100%',
          height: '80px',
          bottom: '0',
          backgroundColor: theme.palette.primary.main,
          alignContent: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            dispatch(setPage({ page: 'home' }))
            if (isChooseAnOptionOpen) {
              setIsChooseAnOptionOpen(false)
            } else if (isAddDatesOpen) {
              setIsAddDatesOpen(false)
            }
          }}
          sx={{
            justifySelf: 'start',
          }}
        >
          <HomeIcon
            sx={{
              fontSize: 35,
              color: page === 'home' && !isChooseAnOptionOpen && !isAddDatesOpen ? theme.palette.selected.default : theme.palette.background.default,
              "&:hover": {
                cursor: "pointer",
              }
            }}
          />
        </IconButton>

        <IconButton
          onClick={() => {
            switch (isAddDatesOpen) {
              case true:
                setIsAddDatesOpen(false)
                setIsChooseAnOptionOpen(true)
                break;
              case false:
                setIsChooseAnOptionOpen(!isChooseAnOptionOpen)
                break;
            }
          }}
          sx={{
            justifySelf: 'end',
          }}
        >
          <MenuIcon
            sx={{
              fontSize: 35,
              color: isChooseAnOptionOpen || ['all', 'done', 'not done'].includes(page) && !isAddDatesOpen ? theme.palette.selected.default : theme.palette.background.default,
              "&:hover": {
                cursor: "pointer",
              }
            }}
          />
        </IconButton>
      </Box>

      {isAddDatesOpen
        &&
        <AddDates />
      }
      <IconButton
        onClick={() => {
          switch (isChooseAnOptionOpen) {
            case true:
              setIsChooseAnOptionOpen(false)
              setIsAddDatesOpen(true)
              break;
            case false:
              setIsAddDatesOpen(!isAddDatesOpen)
              break;
          }
        }}
        sx={{
          display: 'flex',
          position: 'fixed',
          bottom: '40px',
          boxShadow: '0px 4px 10px -5px black',
          width: '60px',
          height: '60px',
          borderRadius: '50px',
          backgroundColor: theme.palette.secondary.main,
          "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main,
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isAddDatesOpen
            ?
            <RemoveCircleIcon // Puede ser la propiedad que no forma parte de Menu
              sx={{
                fontSize: 35,
                // color: 'white',
                color: theme.palette.selected.default,
              }}
            />
            :
            <AddCircleIcon // Puede ser la propiedad que no forma parte de Menu
              sx={{
                fontSize: 35,
                color: 'white',
              }}
            />
          }
        </Box>
      </IconButton>
    </Box>
  )
}

export default memo(Menu)
// export default Menu