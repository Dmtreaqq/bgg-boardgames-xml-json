import puppeteer from 'puppeteer'

export const parseGameIds = async (options) => {
  const browser = await puppeteer.launch({
    headless: 'new',
  })

  const page = await browser.newPage()

  await loginOnBGG(page, options.login, options.password)

  // const lastPage = await getLastPage(page)
  const lastPage = options.lastPageToParse
  const nextPage = 2

  const idsFromFirstPage = await getIdsFromFirstPage(page)
  await new Promise((r) => setTimeout(r, 10000))
  const idsFromOtherPages = await getIdsFromOtherPages(page, nextPage, lastPage)

  await new Promise((r) => setTimeout(r, 10000))
  await browser.close()

  return `${idsFromFirstPage},${idsFromOtherPages}`
}

const setUserCredentials = async (page, login, password) => {
  const usernameField = await page.waitForSelector('input[name="username"]')
  await usernameField.focus()
  await usernameField.type(login)

  const passwordField = await page.waitForSelector('input[name="password"]')
  await passwordField.focus()
  await passwordField.type(password)
}

const signIn = async (page) => {
  const modalSignInSelector = 'div.modal-footer > button[type="submit"]'
  await page.waitForSelector(modalSignInSelector)
  await page.click(modalSignInSelector)
}

const loginOnBGG = async (page, login, password) => {
  await page.goto('https://boardgamegeek.com/browse/boardgame')

  const buttonSelector = 'text/Sign In'
  await page.waitForSelector(buttonSelector)
  await page.click(buttonSelector)

  await setUserCredentials(page, login, password)
  await signIn(page)
  await page.waitForNavigation()
}

const getBoardgamesIdsFromPage = async (page) => {
  const boardGamesIds = await page.$$eval(
    'div[id^="result"] > a[href^="/boardgame/"]',
    (anchors) => {
      return anchors.map((anchor) => anchor.href.split('/')[4])
    }
  )

  return boardGamesIds
}

const getLastPage = async (page) => {
  const lastPageText = await page.$eval(
    'a[title="last page"]',
    (el) => el.textContent
  )

  return lastPageText.slice(1, lastPageText.length - 1)
}

const getIdsFromFirstPage = async (page) => {
  console.log('Page: ', 1)
  const boardGameIds = await getBoardgamesIdsFromPage(page)
  // await writeIDsToFile('ids_test.txt', boardGameIds.toString())

  return boardGameIds.toString()
}

const getIdsFromOtherPages = async (page, nextPage, lastPage) => {
  const result = []

  while (nextPage <= lastPage) {
    console.log('Page: ', nextPage)

    let pageSelector = `a[title="page ${nextPage++}"]`
    await page.waitForSelector(pageSelector)
    await page.click(pageSelector)

    await new Promise((r) => setTimeout(r, 7500))

    const boardGameIds = await getBoardgamesIdsFromPage(page)

    result.push(boardGameIds)
  }

  return result.toString()
}
