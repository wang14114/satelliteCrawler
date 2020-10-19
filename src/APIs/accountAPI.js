var express = require('express')
var router = express.Router()

router.get("/currentUser/",(req,res)=>{
	res.json({ name: 'test'})
})


module.exports = router