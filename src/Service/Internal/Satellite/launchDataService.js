const rocketLaunchDao = require('../../../DBConnection/CrawlerDao/rocketLaunchDao')
var {checkFaiure} = require("../../../Util/apiHelper")

const getLaunchDataList = async () => {
    return await rocketLaunchDao.getRocketLaunchList()
}

module.exports = {getLaunchDataList}