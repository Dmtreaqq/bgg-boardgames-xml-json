import { getBoardgamesByIdsXML } from './services/bggApiService.js'
import {
  getMappedJsonByIds,
  getOriginalJsonByIds,
} from './services/xmlToJsonService.js'
import { parseGameIds } from './services/puppeterService.js'


export {
  parseGameIds,
  getBoardgamesByIdsXML,
  getOriginalJsonByIds,
  getMappedJsonByIds
}