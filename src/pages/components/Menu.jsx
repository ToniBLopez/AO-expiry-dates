import {
  Box,
  Typography,
  IconButton,
  useTheme
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AddDates from '../widgets/AddDates';
import { useState } from 'react';

function Menu() {
  const theme = useTheme()

  const [addDates, setAddDates] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'grid',
          padding: '0px 40px',
          alignContent: 'center',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          height: '80px',
          position: 'absolute',
          bottom: '0',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <HomeIcon
          sx={{
            fontSize: 35,
            color: 'white',
          }}
        />
        <MenuIcon
          sx={{
            fontSize: 35,
            color: 'white',
            justifySelf: 'end'
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
          position: 'absolute',
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
              color: 'white',
              // color: '#006B7D',
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

export default Menu