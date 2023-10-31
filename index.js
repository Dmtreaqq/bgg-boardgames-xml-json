import {
  getOriginalBoardgames,
  getMappedOriginalBoardgames
} from './services/xmlToJsonService.js'
import { getBoardgamesByIdsXML } from './services/bggApiService.js'
import { parseGameIds } from './services/puppeterService.js'

export {
  parseGameIds,
  getBoardgamesByIdsXML,
  getOriginalBoardgames,
  getMappedOriginalBoardgames
}