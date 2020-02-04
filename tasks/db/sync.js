// const db = require('../../config/db')
const Figaro = require('figaro-js')
const axios = require('axios')
const Slam = require('../../server/models/slam.model')
// const { isAfter } = require('date-fns')
Figaro.load()
const API_KEY = process.env.API_KEY

// Helper for news-api.org
async function fetchArticles(params = {}, options = {}) {
  const res = await axios(
    'https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/search',
    {
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'microsoft-azure-bing-news-search-v1.p.rapidapi.com',
        'x-rapidapi-key': API_KEY,
      },
      params,
      ...options,
    }
  )
  return res.data.value
}

async function fetchArticlesAfterDate(date, { page = 1 } = {}) {
  const articles = await fetchArticles({
    q: 'slams',
    count: 100,
  })
  // TODO: fetch older
  // const lastArticle = articles[articles.length - 1]
  // const lastArticleDate = new Date(lastArticle.publishedAt)
  // // if (!date || isAfter(lastArticleDate, date)) {
  // //   const nextArticles = await fetchArticlesAfterDate(date, { page: page + 1 })
  // //   return [...articles, ...nextArticles]
  // // }
  return articles
}

async function main() {
  const latestSlam = await Slam.latest()
  const latestSlamDate = latestSlam ? latestSlam.time : null
  try {
    const newArticles = await fetchArticlesAfterDate(latestSlamDate)
    for (const article of newArticles) {
      await Slam.create({
        title: article.name,
        url: article.url,
        time: article.datePublished,
      })
    }
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
  process.exit(0)
}

main()
