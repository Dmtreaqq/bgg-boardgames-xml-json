import { getBoardgamesByIdsXML } from './services/bggApiService.js'
import {
  getMappedJsonFromOriginalJson,
  getOriginalJsonFromXml,
} from './services/xmlToJsonService.js'
import { parseGameIds } from './services/puppeterService.js'


export {
  parseGameIds,
  getBoardgamesByIdsXML,
  getOriginalJsonFromXml,
  getMappedJsonFromOriginalJson
}