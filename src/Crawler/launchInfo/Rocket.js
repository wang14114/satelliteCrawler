
class Rocket {
    constructor() {
        this.id = ''
        this.rocketName = ''
        this.launchLocation = ''
        this.launchDate = ''
        this.satelliteList = []
    } 
    
    print() {
        console.log(`Launch - ID: ${this.id}, Rocket: ${this.rocketName}, Location: ${this.launchLocation}, Date: ${this.launchDate}`)
        this.satelliteList.map(satellite => {
            satellite.print()
        })
    }

    mongoDBFormat() {
        let result = {}
        result['id'] = this.id
        result['rocketName'] = this.rocketName
        result['launchDate'] = this.launchDate
        result['satelliteList'] = []
        this.satelliteList.map(satellite=>{
            result['satelliteList'].push(satellite.mongoDBFormat())
        }) 
        return result
    }
}

module.exports = Rocket