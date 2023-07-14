import dataClassification from '../../dataClassification'

const getProductsData = async (dispatch, dataRequest) => {
  try {
    const datesResponse = await fetch(
      `http://localhost:8080/products/${dataRequest}`,
      // `http://expirydates.fly.dev/products/${dataRequest}`,
      {
        method: 'GET'
      }
    )
    const savedDatesResponse = await datesResponse.json()
    if (datesResponse.ok) {
      dataClassification(dispatch, savedDatesResponse)
    } else {
      console.error(savedDatesResponse.message)
    }
  } catch (err) {
    console.error(err)
  }
}

export default getProductsData