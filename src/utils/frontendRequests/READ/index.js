import dataClassification from '../../dataClassification'

const getProductsData = async (dispatch, storeId, dataRequest) => {
  try {
    const datesResponse = await fetch(
      // `http://localhost:8080/products/${dataRequest}?store=${storeId}`,
      `http://expirydates.fly.dev/products/${dataRequest}?store=${storeId}`,
      {
        method: 'GET',
      },
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