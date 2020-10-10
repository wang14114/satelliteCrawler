const ZaryaCrawler = require(`../../../Crawler/ZaryaCrawler`)

const startZaryaCrawler = async (year) => {
    return await ZaryaCrawler.start(year)
}

const clearZaryaCrawlerData = async () => {
    return await ZaryaCrawler.clearAll()
}

module.exports = {startZaryaCrawler,clearZaryaCrawlerData}