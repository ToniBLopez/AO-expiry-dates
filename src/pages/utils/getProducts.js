import { setPage, setProducts } from '../../state'

const getProducts = async (batch, dispatch, page) => {
  let selectedData;
  switch (page) {
    case 'home':
      selectedData = 'weekly'
      break;
    case 'all':
      selectedData = 'all'
      break;
    case 'not done':
      selectedData = 'notDone'
      break;
    case 'done':
      selectedData = 'done'
      break;
  }

  try {
    const datesResponse = await fetch(
      `http://expirydates.fly.dev/products/${selectedData}`,
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
      batch(() => {
        dispatch(setPage({ page }))
        dispatch(setProducts({ products: dataGroupedByDate }))
      })
    } else {
      console.error(savedDatesResponse.message)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getProducts