import xml2js from 'xml2js'
import { getMappedBoardgames } from './boardgameMapperService.js'
import { getBoardgamesByIdsXML } from './bggApiService.js'

export const getOriginalJsonByIds = async (ids) => {
  const xml = await getBoardgamesByIdsXML(ids)

  const parser = new xml2js.Parser({
    explicitArray: false,
    attrkey: 'attr',
    charkey: 'text',
  })
  const { parseStringPromise } = parser

  try {
    const result = await parseStringPromise(xml)
    return JSON.stringify(result)
  } catch (err) {
    console.error('Error while parsing XML or JSON')
  }
}

export const getMappedJsonByIds = async (ids) => {
  const originalJson = await getOriginalJsonByIds(ids)

  const jsonObject = JSON.parse(originalJson)
  const boardgames = jsonObject.boardgames.boardgame
  const resultBoardgames = getMappedBoardgames(boardgames)

  try {
    const result = JSON.stringify({ boardgames: resultBoardgames })
    return result
  } catch (err) {
    console.error(err)
  }
}
