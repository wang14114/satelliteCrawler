class Satellite {
    constructor() {
        this.satelliteName = ''
        this.satelliteNo = 'N/A'
        this.satelliteStatus = ''
        this.description = ''
        this.orbitDescription = ''
        this.orbitList = []
    } 
    
    print() {
        console.log(`Satellite - Name: ${this.satelliteName}, No: ${this.satelliteNo}, Status: ${this.satelliteStatus}`)
        console.log(`Satellite - Description: ${this.description}`)
        if (this.orbitDescription !== ''){
            console.log(`Orbit - Description: ${this.orbitDescription}`)
        }
        this.orbitList.map(orbit=>{
            orbit.print()
        }) 
    }
    
    mongoDBFormat() {
        let result = {}
        result['satelliteName'] = this.satelliteName
        result['satelliteNo'] = this.satelliteNo
        result['satelliteStatus'] = this.satelliteStatus
        result['description'] = this.description
        result['orbitDescription'] = this.orbitDescription
        result['orbitList'] = []
        this.orbitList.map(orbit=>{
            result['orbitList'].push(orbit.mongoDBFormat())
        }) 
        return result
    }
}

module.exports = Satellite