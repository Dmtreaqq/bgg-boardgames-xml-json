import axios from 'axios'
import fs from 'fs/promises'

const BGG_API_URL = 'https://www.boardgamegeek.com/xmlapi'

export const getBoardgamesByIdsXML = async (ids) => {
  const url = `${BGG_API_URL}/boardgame/${ids}`
  try {
    const boardgamesXMLresponse = await axios.get(url)

    return boardgamesXMLresponse.data
  } catch (err) {
    console.error(
      'Failed to fetch boardgames from BGG API, try later or use less IDs (URL saved to urls.txt)',
      err.message
    )

    await fs.appendFile('urls.txt', url + '\n')
    return
  }
}

const getNestedIdsArray = (idsString) => {
  const idsArray = idsString.split(',')

  return idsArray.reduce((acc, _, index, array) => {
    if (index % 100 === 0) {
      acc.push(array.slice(index, index + 20))
    }

    return acc
  }, [])
}

export const getBoardgamesByIdsXMLArray = async (ids) => {
  const xmls = []

  const nestedArrayOfIds = getNestedIdsArray(ids)
  const nestedLength = nestedArrayOfIds.length
  const clearedNestedArrayOfIds = nestedArrayOfIds.map((idsArray, index) => {
    if (index === nestedLength - 1) {
      return idsArray.filter(Boolean)
    }

    return idsArray
  })

  for (let i = 0; i < clearedNestedArrayOfIds.length; i++) {
    console.log(`Processing ${i+1}00 games...`)
    const xml = await getBoardgamesByIdsXML(clearedNestedArrayOfIds[i].toString())
    console.log('Request done')
    
    if (xml) {
      xmls.push(xml)
    }

    await new Promise(resolve => setTimeout(resolve, 8000));
  }

  return xmls
}
