import {
  Box,
  Checkbox,
  Typography,
  useTheme
} from '@mui/material'
import Header from '../components/Header'
import Menu from '../components/Menu'
import { useDispatch } from 'react-redux'
import { setPage } from '../../state'
import { useEffect, useState } from 'react'

const index = () => {
  console.log('renders')
  const [loading, setLoading] = useState(true)
  const [groupedData, setGroupedData] = useState({})

  const today = new Date()
  const currentYear = today.getDate().toString().padStart(2, '0')
  const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0')
  const currentDay = today.getFullYear().toString()
  const todaysDate = `${currentDay}.${currentMonth}.${currentYear}`

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const theme = useTheme()
  const dispatch = useDispatch()
  dispatch(
    setPage({
      page: 'home'
    })
  )

  useEffect(() => {
    const getDates = async () => {
      try {
        /* GET */
        const datesResponse = await fetch(
          'http://localhost:8000/home/products',
          {
            method: 'GET'
          }
        )
        const savedDatesResponse = await datesResponse.json()
        if (datesResponse.ok) {
          const gatherDataByDate = savedDatesResponse.reduce((acc, obj) => {
            const date = obj.expiryDate
            if (!acc[date]) {
              acc[date] = [obj]
            } else {
              acc[date].push(obj)
            }
            return acc
          }, {})
          setGroupedData(gatherDataByDate)
          console.log(gatherDataByDate)
          setLoading(false)
        } else {
          console.error(savedDatesResponse.error)
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    getDates()
  }, [])

  return (
    <Box>
      <Header />
      <Menu />
      <Box
        sx={{
          width: '100%',
          p: '0px 30px'
        }}
      >
        {loading
          ?
          <Typography>Loading...</Typography>
          :
          Object.keys(groupedData).map(
            el =>
              <Box
                key={el}
                sx={{
                  width: '100%',
                  mb: '20px'
                }}
              >
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main
                  }}
                >
                  {el}
                </Typography>

                {
                  groupedData[el].map(el =>
                    <Box
                      key={JSON.stringify(el)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Checkbox {...label} />
                      <Typography
                        variant='p'
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {el.name}
                      </Typography>
                    </Box>
                  )
                }
              </Box>
          )
        }
      </Box>
    </Box>
  )
}

/* {
  JSON.stringify(groupedData)
} */

export default index