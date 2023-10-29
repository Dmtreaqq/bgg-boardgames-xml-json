# BigGameGeek Boardgames XML JSON

This is a simple package only to retrieve boardgames from BigGameGeek.

Scrap IDs from website and go to XML API then transforming it to JSON :)

It works only with ES Modules, hence you need set ```"type": "module"``` inside your ***package.json***

It has four different functions which allow you to:

1. Parse all gameIds from BGG boardgames webpage - ```parseGameIds(config)```
2. Get boardgames by IDs in XML - ```getBoardgamesByIdsXML(idsInString)```
3. Get boardgames by IDs in JSON - ```getOriginalJsonByIds(idsInString)```
4. Get mapped JSON by IDs with camelCase (Also removed fields such as poll) - ```getMappedJsonByIds(idsInString)```

## Setup

```
npm install bgg-boardgames-xml-json
```

### package.json
Set type to "module" in package.json
```json
{
  "type": "module"
}
```

yourfile.js
```javascript
import { parseGameIds, getBoardgamesByIdsXML, getOriginalJsonFromXml, getMappedJsonFromOriginalJson } from 'bgg-boardgames-xml-json'

// use functions
```

## parseGameIds(config)

### To get ids of boardgames, it needs to login on the BGG website and set how many pages to parse

Under the hood it opens the browser, hence this operation is long-term

```javascript
const config = {
  login: 'YourBggLogin',
  password: 'YourBggPassword',
  lastPageToParse: 3 // Three pages will be pared
}

const ids = await parseGameIds(config) // '224517,161936, ...'
```
Be aware that one page **returns 100 boardgames**

## getBoardGamesByIdsXML(ids)
### To get boardgames data from BGG API in XML 

We can use parseGameIds with getBoardGamesByIdsXML
```javascript
const ids = await parseGameIds(config) // '224517,161936'

const xml = await getBoardgamesByIdsXML(ids) // <boardgame>...</boardgame>
```
Or we can pass the string itself
```javascript
const xml = await getBoardgamesByIdsXML('224517,161936') // <boardgame>...</boardgame>
```

## getOriginalJsonByIds(ids)
### To get boardgames data from BGG in original JSON
Same we can use parseGameIds with getOriginalJsonByIds
```javascript
const ids = await parseGameIds(config) // '224517,161936'

const originalJSON = await getOriginalJsonByIds(ids) // { boardgame: { boardgame: [] } }
```
Or we can pass the string itself
```javascript
const originalJSON = await getOriginalJsonByIds('224517,161936') // { boardgame: { boardgame: [] } }
```

## getMappedJsonByIds(ids)
### To get boardgames data from BGG in original JSON
Same we can use parseGameIds with getMappedJsonByIds
```javascript
const ids = await parseGameIds(config) // '224517,161936'

const originalJSON = await getMappedJsonByIds(ids) // { boardgame: [] }
```
Or we can pass the string itself
```javascript
const originalJSON = await getMappedJsonByIds('224517,161936') // { boardgame: [] }
```

## Examples
### Read boardgames data from first three pages and write it to XML, JSON, mapped JSON

```javascript
import { parseGameIds, getBoardgamesByIdsXML } from 'bgg-boardgames-xml-json'
import fs from 'fs/promises'

const config = {
  login: 'YourLogin',
  password: 'YourPassword',
  lastPageToParse: 3
}

// Login to BGG, Run chromium, navigate urls to get IDs
const ids = await parseGameIds(config)

// Get XML and save it to file
const xml = await getBoardgamesByIdsXML(ids)
await fs.writeFile('./boardgames.xml', xml)

// Get AS IS json converted from XML and save it to file
const json = await getOriginalJsonByIds(ids)
await fs.writeFile('./boardgames-original.json', json)

// Get mapped json converted from XML and save it to file
const mappedJSON = await getMappedJsonByIds(ids)
await fs.writeFile('./boardgames-mapped.json', mappedJSON)
```