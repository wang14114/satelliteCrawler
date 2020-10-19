var express = require('express')
var router = express.Router()

router.use('/api/satellite',require('./satelliteAPI'))
router.use('/api/account',require('./accountAPI'))

module.exports = router;