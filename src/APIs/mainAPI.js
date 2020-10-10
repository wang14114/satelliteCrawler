var express = require('express')
var router = express.Router()

router.use('/api/satellite',require('./satelliteAPI'))

module.exports = router;