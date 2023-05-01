import { setProducts } from '../../state'

const getProducts = async (dispatch, selectedData) => {
  try {
    const datesResponse = await fetch(
      `http://localhost:8000/home/${selectedData}`,
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
      dispatch(setProducts({ products: gatherDataByDate }))
    } else {
      console.error(savedDatesResponse.error)
      dispatch(setProducts({ products: null }))
    }
  } catch (err) {
    dispatch(setProducts({ products: null }))
    console.error(err)
  }
}

export default getProducts