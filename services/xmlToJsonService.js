import xml2js from 'xml2js'
import { getMappedBoardgames } from './boardgameMapperService.js'
import { getBoardgamesByIdsXMLArray } from './bggApiService.js'

export const getBoardGamesArray = async (ids) => {
  const xmlArr = await getBoardgamesByIdsXMLArray(ids)
  const boardgamesFromXmlArray = []

  const parser = new xml2js.Parser({
    explicitArray: false,
    attrkey: 'attr',
    charkey: 'text',
  })
  const { parseStringPromise } = parser

  for (let i = 0; i < xmlArr.length; i++) {
    try {
      const boardgame = await parseStringPromise(xmlArr[i])
      boardgamesFromXmlArray.push(boardgame)
    } catch (err) {
      console.error('Error while parsing XML or JSON: ', err)
    }
  }

  return boardgamesFromXmlArray
}

export const getOriginalBoardgames = async (ids) => {
  const boardgamesXmlArray = await getBoardGamesArray(ids)

  const boardGamesArray = boardgamesXmlArray.reduce((gamesArray, game) => {
    gamesArray = gamesArray.concat(game.boardgames.boardgame)

    return gamesArray
  }, []);

  return JSON.stringify({
    boardgames: boardGamesArray,
  })
}

export const getMappedOriginalBoardgames = async (ids) => {
  const originalJson = await getOriginalBoardgames(ids)
  try {
    const boardgames = JSON.parse(originalJson)
    const resultBoardgames = getMappedBoardgames(boardgames.boardgames)

    return { boardgames: resultBoardgames }
  } catch (err) {
    console.error(err)
  }
}
