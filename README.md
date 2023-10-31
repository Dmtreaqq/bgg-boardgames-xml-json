# BigGameGeek Boardgames XML JSON

This is a simple package only to retrieve boardgames from BigGameGeek.

[![NPM Version][npm-version-image]][npm-url]

Scrap IDs from website and go to XML API then transforming it to JSON :)

It works only with ES Modules, hence you need set ```"type": "module"``` inside your ***package.json***

It has four different functions which allow you to:

1. Parse all gameIds from BGG boardgames webpage - ```parseGameIds(config)```
2. Get boardgames by IDs in XML - ```getBoardgamesByIdsXML(idsInString)```
3. Get boardgames by IDs in JS object - ```getOriginalBoardgames(idsInString)```
4. Get mapped JS object by IDs with camelCase (Also removed fields such as poll) - ```getMappedOriginalBoardgames(idsInString)```

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
import { parseGameIds, getBoardgamesByIdsXML, getOriginalBoardgames, getMappedOriginalBoardgames } from 'bgg-boardgames-xml-json'

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

## getOriginalBoardgames(ids)
### To get boardgames data from BGG in original JS object
Same we can use parseGameIds with getOriginalBoardgames
```javascript
const ids = await parseGameIds(config) // '224517,161936'

const originalBoardgames = await getOriginalBoardgames(ids) // { boardgame: { boardgame: [] } }
```
Or we can pass the string itself
```javascript
const originalBoardgames = await getOriginalBoardgames('224517,161936') // { boardgame: { boardgame: [] } }
```

## getMappedOriginalBoardgames(ids)
### To get boardgames data from BGG in mapped JS object
Same we can use parseGameIds with getMappedOriginalBoardgames
```javascript
const ids = await parseGameIds(config) // '224517,161936'

const mappedBoardgames = await getMappedOriginalBoardgames(ids) // { boardgame: [] }
```
Or we can pass the string itself
```javascript
const mappedBoardgames = await getMappedOriginalBoardgames('224517,161936') // { boardgame: [] }
```

## Examples
### Read boardgames data from first three pages and write it to XML, JSON, mapped JSON

```javascript
import { parseGameIds, getBoardgamesByIdsXML, getOriginalBoardgames, getMappedOriginalBoardgames } from 'bgg-boardgames-xml-json'
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

// Get AS IS js object converted from XML and save it to file as JSON
const originalBoardgames = await getOriginalBoardgames(ids)
await fs.writeFile('./boardgames-original.json', originalBoardgames.toString())

// Get mapped js object converted from XML and save it to file as JSON
const mappedOriginalBoardgames = await getMappedOriginalBoardgames(ids)
await fs.writeFile('./boardgames-mapped.json', mappedOriginalBoardgames.toString())
```

[npm-version-image]: https://badgen.net/npm/v/bgg-boardgames-xml-json
[npm-url]: bgg-boardgames-xml-json