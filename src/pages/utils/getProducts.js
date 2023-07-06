import { setProducts } from '../../state'

const getProducts = async (dispatch, selectedData) => {

  switch (selectedData) {
    case 'not done':
      selectedData = 'notDone'
      break;
  }
  try {
    const datesResponse = await fetch(
      `http://localhost:8080/products/${selectedData}`,
      // `http://expirydates.fly.dev/products/${selectedData}`,
      {
        method: 'GET'
      }
    )
    const savedDatesResponse = await datesResponse.json()
    if (datesResponse.ok) {
      const dataGroupedByDate = savedDatesResponse.reduce((acc, obj) => {
        const date = obj.expiryDate
        if (!acc[date]) {
          acc[date] = [obj]
        } else {
          acc[date].push(obj)
        }
        return acc
      }, {})
      console.log(dataGroupedByDate)
      dispatch(setProducts({ products: dataGroupedByDate }))
    } else {
      console.error(savedDatesResponse.message)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getProducts