import dataClassification from '../../dataClassification'

const updateCheck = async ({
  dispatch,
  storeId,
  productsHaveDone,
  page,
}) => {
  try {
    const response = await fetch(
      'http://localhost:8080/products/updateDone',
      // 'http://expirydates.fly.dev/products/updateDone',
      {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          storeId,
          productId: productsHaveDone['lastUpdatedId'],
          page,
        }),
      }
    )
    const savedResponse = await response.json()
    if (response.ok) {
      console.log(savedResponse)
      dataClassification(dispatch, savedResponse.products, true)
    } else {
      console.error(savedResponse)
    }
  } catch (err) {
    console.error(err)
  }
}

export default updateCheck