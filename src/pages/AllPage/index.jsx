import { useState } from "react"

const index = () => {
  const [dates, setDates] = useState('')
  let inputValue = ''

  const getData = async (inputValue) => {
    try {
      inputValue = document.getElementById('inputId').value
      /* CREATE */
      const response = await fetch(
        'http://localhost:8000/home/product',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: inputValue,
            expiryDate: '24.04.2023'
          })
        }
      )
      const savedResponse = await response.json()
      if (response.ok) {
        console.group('productCreated.ok')
        console.log(savedResponse)
        console.groupEnd()
      } else {
        console.error(savedResponse.error)
      }
      /* GET */
      const datesResponse = await fetch(
        'http://localhost:8000/home/products',
        {
          method: 'GET'
        }
      )
      const savedDatesResponse = await datesResponse.json()
      if (datesResponse.ok) {
        console.group('datesResponse.ok')
        console.log(savedDatesResponse)
        console.groupEnd()
        let namesList = []
        for (let i = 0; i < savedDatesResponse.length; i++) {
          namesList.push(savedDatesResponse[i].name)
        }
        setDates(namesList)
      } else {
        console.error(savedDatesResponse.error)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {dates
        ?
        dates.map(element => (
          <div>- {element}</div>
        ))
        :
        <>
          <input type="text" id="inputId" placeholder="Product Name" />
          <button onClick={() => getData(inputValue)}>Get Data</button>
        </>
      }
    </div>
  )
}

export default index