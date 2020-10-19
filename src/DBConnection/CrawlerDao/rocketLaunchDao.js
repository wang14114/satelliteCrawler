var commonDao = require("../commonDao")
var status = require("../../config/status.json")

const collectionName = "rocketLaunch"

var addRocketLaunch = async (rocketLaunch) => {
    return await commonDao.insertMany(collectionName , rocketLaunch).then(
        res=>{
            console.log(new Date()+" add rocket launch record number : " + res.insertedCount)
            return res.insertedCount >= 0 ? status.insertSuccess : status.insertFailure
        }
    ).catch(
        err=>{
            console.log(err)
            return status.insertFailure
        }
    )
}

var clearRocketLaunch = async (year) => {
    let param = {}
    if(year){
        param = {id: new RegExp(`^${year}`)}
    }
    return await commonDao.deleteMany(collectionName,param).then(
        res=>{
            console.log(new Date() + " clear rocket launch record number :" + res.deletedCount);
            return res.deletedCount >= 0 ? status.deleteSuccess : status.deleteFailure;
        }
    ).catch(err=>{console.log(err)});
}

var getRocketLaunchList = async () => {
    return await commonDao.findAllByAscend(collectionName,{},{id:1}).then(
        res=>{
            console.log(new Date() + " find current rocket launch ascend list");
            return res;
        }
    ).catch(err=>{console.log(err)});
}


module.exports = {addRocketLaunch,
                clearRocketLaunch,
                getRocketLaunchList
                }
