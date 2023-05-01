import {
  Box,
  useTheme
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AddDates from '../widgets/AddDates';
import Options from '../widgets/Options';
import { useState, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const Menu = () => {
  const theme = useTheme()
  const [addDates, setAddDates] = useState(false)
  const [chooseAnOption, setChooseAnOption] = useState(false)
  const { page } = useSelector(state => state)
  const dispatch = useDispatch()

  const goToHome = async () => {
    await getProducts(dispatch, 'home')
  }

  useEffect(() => {
    if (addDates) {
      setChooseAnOption(false)
    }

  }, [addDates])

  useEffect(() => {
    if (chooseAnOption) {
      setAddDates(false)
    }

  }, [chooseAnOption])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {chooseAnOption
        &&
        <Options />
      }
      <Box
        sx={{
          display: 'grid',
          padding: '0px 40px',
          alignContent: 'center',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          height: '80px',
          position: 'fixed',
          bottom: '0',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <HomeIcon
          onClick={goToHome}
          sx={{
            fontSize: 35,
            color: theme.palette.background.default,
            "&:hover": {
              cursor: "pointer",
            }
          }}
        />

        <MenuIcon
          onClick={() => setChooseAnOption(!chooseAnOption)}
          sx={{
            fontSize: 35,
            color: chooseAnOption ? theme.palette.selected.default : theme.palette.background.default,
            justifySelf: 'end',
            "&:hover": {
              cursor: "pointer",
            }
          }}
        />
      </Box>

      {addDates
        &&
        <AddDates />
      }
      <Box
        onClick={() => setAddDates(!addDates)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          bottom: '40px',
          boxShadow: '0px 4px 10px -5px black',
          width: '60px',
          height: '60px',
          borderRadius: '50px',
          backgroundColor: theme.palette.secondary.main,
          "&:hover": {
            cursor: "pointer",
          }
        }}
      >
        {addDates
          ?
          <RemoveCircleIcon
            sx={{
              fontSize: 35,
              // color: 'white',
              color: theme.palette.selected.default,
            }}
          />
          :
          <AddCircleIcon
            sx={{
              fontSize: 35,
              color: 'white',
            }}
          />
        }
      </Box>
    </Box>
  )
}

export default memo(Menu)
// export default Menu