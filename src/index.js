const CronJob = require('cron').CronJob;
const fetchNews = require('./app/jobs/fetch-news')

const job = new CronJob('*/30 * * * * *', fetchNews)

job.start()
