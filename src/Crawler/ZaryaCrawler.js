var JSSoup = require('jssoup').default;
var request = require('request-promise');
const Rocket = require('./launchInfo/Rocket')
const Orbit = require('./launchInfo/Orbit');
const Satellite = require('./launchInfo/Satellite');
const { params } = require('./config').config;
const rocketLaunchDao = require('../DBConnection/CrawlerDao/rocketLaunchDao');
const { flatMapSeries } = require('async');

const getId = (launchData) => {
    return launchData.find('div', {'class':'h5white'}).text
}

const getRocketName = (launchData) => {
    return launchData.find('div', {'class':'h5gold'}).contents[0]._text
}

const getlaunchLocation = (launchData) => {
    if (launchData.find('div', {'class':'h5gold'}).contents.length > 2){
        return launchData.find('div', {'class':'h5gold'}).contents[2]._text
    }
    return 'N/A'
}

const getlaunchDate = (launchData) => {
    return launchData.find('div', {'class':'h5whiteright'}).text
}

const getSatelliteInfo = (launchData) => {
    let satelliteList = launchData.findAll('tr', {'class' : 'bodyrow'})
    let list = []
    satelliteList.forEach(data => {
        let satellite = new Satellite()
        satelliteInfo = data.find('div', {'class':'h5blue'}).contents
        if(satelliteInfo.length > 0){
            satellite.satelliteName = satelliteInfo[0]._text  // Starlink-1073
        }else{
            satellite.satelliteName = 'N/A'
        }
        if(satelliteInfo.length > 2){
            satellite.satelliteNo = satelliteInfo[2]._text  // 2020-001A
        }else{
            satellite.satelliteNo = 'N/A'
        }
        statusContents = data.find('div', {'class':'h5blueright'}).contents
        if (statusContents.length === 0){
            satellite.satelliteStatus = 'N/A'
        }
        statusContents.forEach(e=>{
            if(e._text !== undefined){
                satellite.satelliteStatus += e._text.replace('\n','')
            }else{
                // error fallback , because the library will regard < 1 days as html tag
                if(e.name == 'br'){
                    satellite.satelliteStatus += ','
                }else{
                    satellite.satelliteStatus += '< ' + e.name
                    //console.log(e.attrs)
                    for(let attr in e.attrs){
                        satellite.satelliteStatus += ' ' + attr
                    }
                }
            }
        })

        // satellite description
        let satelliteDescriptionInfo = data.nextSibling
        let descriptionContents = satelliteDescriptionInfo.nextElement.contents
        satellite.description = descriptionContents[0] !== undefined ? descriptionContents[0]._text : 'N/A'
        
        // orbit description
        if (descriptionContents.length == 4){
            satellite.orbitDescription = descriptionContents[3].nextElement._text
        }
        let orbitTitleInfo = satelliteDescriptionInfo.nextSibling
        let orbitTitleInfoContents = orbitTitleInfo.contents
        if (orbitTitleInfoContents.length === 1 ){
            satellite.orbitDescription = orbitTitleInfoContents[0].nextElement._text !== undefined ? orbitTitleInfoContents[0].nextElement._text : 'N/A'
        }else{
            let orbitList = []
            getOrbitList(orbitTitleInfo, orbitTitleInfo.nextSibling, orbitList)
            satellite.orbitList = orbitList
        }

        list.push(satellite)
    })
    return list
}

const getOrbitList = (orbitTitleInfo, orbitData, orbitList) => {
    let orbitTitleContents = orbitTitleInfo.contents
    let orbitDataContents = orbitData.contents
    let orbit = new Orbit()
    if(orbitDataContents.length == 10){
        orbitTitleContents.forEach((e,i)=>{
            if(e.contents.length === 0) return
            switch(i){
                case 0: orbit.epoch = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 1: orbit.smAxis = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 2: orbit.ecc = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 3: orbit.perigee = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 4: orbit.apogee = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 5: orbit.period = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 6: orbit.incl = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 7: orbit.w = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 8: orbit.GEOLongitude = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
                case 9: orbit.descNode = orbitDataContents[i].nextElement._text !== undefined ? orbitDataContents[i].nextElement._text : 'N/A';break;
            }
        })
        orbitList.push(orbit)
        if (orbitData.nextSibling.contents.length === 10){
            getOrbitList(orbitTitleInfo, orbitData.nextSibling, orbitList)
        }  
    }else{
        orbitList.push(orbit)
    } 
 }

const getlaucnhData = (soup) => {
    launchData = soup.findAll('table',{'id':'orbitdata'})
    let launchDataList = []
    for(let i = 0; i < launchData.length; i++){
        data = launchData[i]
        let rocket = new Rocket()
        rocket.id = getId(data)
        rocket.rocketName = getRocketName(data)
        rocket.launchLocation = getlaunchLocation(data)
        rocket.launchDate = getlaunchDate(data)
        rocket.satelliteList = getSatelliteInfo(data)
        launchDataList.push(rocket.mongoDBFormat())         
    }
    return launchDataList
}

const prepareParams = (year) => {
    let tempParams = Object.assign({},params)
    tempParams.url = tempParams.url + year
    return tempParams
}

const start = async (year) => {
    let requestParams = prepareParams(year)
    
    return await request(requestParams,function(error,res,data){
        if(error) throw error
        return data
    }).then(html => {
        return getlaucnhData(new JSSoup(html))
    }).then(data=>{
        return rocketLaunchDao.clearRocketLaunch(year).then(result=>{
            if(result){
                return rocketLaunchDao.addRocketLaunch(data)
            }
        }) 
    }).catch(err=>{
        //console.log(err)
        return false
    })
}

const clearAll = async () =>{
    return await rocketLaunchDao.clearRocketLaunch()
} 

module.exports = { start, clearAll }



