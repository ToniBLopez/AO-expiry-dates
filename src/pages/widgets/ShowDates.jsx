import {
  Box,
  Typography,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'

function ShowDates(data = [{name: 'Pollo', date: '21.02.2024'}]) {
  const theme = useTheme()
  const fecha = new Date()
  const currentYear = fecha.getFullYear()
  const currentMonth = fecha.getMonth() + 1
  const currentDay = fecha.getDate()

  // const today = data.map(el => {
  //   const separateDate = el.date.split('.')
  //   const day = separateDate[0]
  //   // const month = separateDate[1]
  //   // const year = separateDate[2]

  //   return day === currentDay
  // })

  return (
    <Box>
      <Typography>
        {tittle}
      </Typography>

      {/* {
        data.map(el => {
          return <input type='checkbox'>
            {el.name}
          </input>
        })
      } */}

    </Box>
  )
}

export default ShowDates