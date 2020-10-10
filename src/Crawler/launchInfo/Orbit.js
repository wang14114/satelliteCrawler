class Orbit {
    constructor() {
        this.epoch = 'N/A'
        this.smAxis = 'N/A'
        this.ecc = 'N/A'
        this.perigee = 'N/A'
        this.apogee = 'N/A'
        this.period = 'N/A'
        this.incl = 'N/A'
        this.w = 'N/A'
        this.descNode = 'N/A'
        this.GEOLongitude = 'N/A'
    } 
    
    print() {
        console.log(`Orbit - epoch(UTC): ${this.epoch}, s-m axis( km ): ${this.smAxis}, ecc: ${this.ecc}, perigee( km ): ${this.perigee}, apogee( km ): ${this.apogee}, period( min ): ${this.period}, incl( ° ): ${this.incl}, ω( ° ): ${this.w}, desc node(local time): ${this.descNode}, GEO Longitude(.): ${this.GEOLongitude}`)
    }

    mongoDBFormat() {
        let result = {}
        result['epoch'] = this.epoch
        result['smAxis'] = this.smAxis
        result['ecc'] = this.ecc
        result['perigee'] = this.perigee
        result['apogee'] = this.apogee
        result['period'] = this.period
        result['incl'] = this.incl
        result['w'] = this.w
        result['descNode'] = this.descNode
        result['GEOLongitude'] = this.GEOLongitude
        return result
    }
}

module.exports = Orbit