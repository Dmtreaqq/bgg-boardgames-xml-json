import axios from 'axios'

const BGG_API_URL = 'https://www.boardgamegeek.com/xmlapi'

export const getBoardgamesByIdsXML = async (ids) => {
  try {
    const boardgamesXMLresponse = await axios.get(
      `${BGG_API_URL}/boardgame/${ids}`
    )

    return boardgamesXMLresponse.data
  } catch (err) {
    console.error(
      'Failed to fetch boardgames from BGG API, try later or use less IDs',
      err.message
    )
    return
  }
}
