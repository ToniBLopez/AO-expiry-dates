import { setProducts, setProductsHaveDone } from '../state'

const dataClassification = (dispatch, productsData, isCheckUpdate = false) => {
  const dataGroupedByDate = productsData.reduce((acc, obj) => {
    const date = obj.expiryDate
    if (!acc[date]) {
      acc[date] = [obj]
    } else {
      acc[date].push(obj)
    }
    return acc
  }, {})
  const initialDoneState = {
    lastUpdatedId: '',
  }
  Object.values(dataGroupedByDate).forEach(element => {
    element.forEach(product => {
      initialDoneState[product._id] = product.done
    })
  })
  if (isCheckUpdate) {
    dispatch(setProducts({ products: dataGroupedByDate }))
  } else {
    dispatch((dispatch) => {
      dispatch(setProducts({ products: dataGroupedByDate }))
      dispatch(setProductsHaveDone({ productsHaveDone: initialDoneState }))
    })
  }
}

export default dataClassification