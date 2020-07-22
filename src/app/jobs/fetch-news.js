const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const DEVICE = {
  name: 'Desktop 1920x1080',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
  viewport: {
    width: 1920,
    height: 1080
  }
}

const fetchNews = async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.emulate(DEVICE)
    await page.goto('https://g1.globo.com/')

    const news = await page.$$eval('.bstn-hls .bstn-hl-wrapper', nodes => nodes.map(node => node.innerHTML))
    const newsFormatted = []

    news.forEach(n => {
      const $ = cheerio.load(n)
      const title = $('.bstn-hl .bstn-hl-link .bstn-hl-mainitem .bstn-hl-title').text()
      const link = $('.bstn-hl .bstn-hl-link').attr('href')

      newsFormatted.push({ title, link })
    });

    await browser.close()
    console.log(new Date().toISOString(), newsFormatted)
  } catch (error) {
    console.log(error)
  }
}

module.exports = fetchNews
