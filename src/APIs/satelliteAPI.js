var express = require('express')
var router = express.Router()
var launchDataService = require("../Service/Internal/Satellite/launchDataService")
var crawlerService = require("../Service/External/Crawler/ZaryaService")
var async = require("../../node_modules/async")

router.get("/launchData/",(req,res)=>{
    async.waterfall([
      (callback) => {
        launchDataService.getLaunchDataList().then(
              data=>{
                  if(data) callback(null,data)
              }
          ).catch(err => {console.log(err)})
      },
      (data,callback) => {
        res.json({lauchDataList : data})
        callback(null,"return launch data list successfully")
      },
  ],(err,res)=>{
      if(err) throw err
      console.log(res)
  })
})

router.post("/crawler/",(req,res)=>{
    const { years } = req.body;
    let error = false
    async.eachSeries(years, (year, callback)=>{
        crawlerService.startZaryaCrawler(year).then(result=>{
            if(!result) error = true
            callback(null)   
        })
    },(err)=>{
        if(error){
            res.send({
                status: 'error',
            });	
        }else{
            res.send({
                status: 'ok',
            })
        }
        
    })
})

router.post("/clearLaunchData/",(req,res)=>{
    crawlerService.clearZaryaCrawlerData().then(
        result =>{
            if(result){
                res.send({
                    status: 'ok',
                });
            }else{
                res.send({
                    status: 'error',
                  });	
            }
        }
    )
})

module.exports = router