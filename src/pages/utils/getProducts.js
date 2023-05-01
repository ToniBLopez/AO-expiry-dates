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
      `http://localhost:8000/products/${selectedData}`,
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
      console.log(gatherDataByDate)
      batch(() => {
        dispatch(setPage({ page }))
        dispatch(setProducts({ products: gatherDataByDate }))
      })
    } else {
      console.error(savedDatesResponse.error)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getProducts