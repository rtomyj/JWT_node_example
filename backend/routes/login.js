var express = require('express')
var router = express.Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync('./keys/private.key')

const signature = {
	issuer: 'backend',
	subject: 'login',
	audience: 'http://localhost:3000',
	expiresIn: "1m",
	algorithm: "RS256"
}

const users = {'javi': '0001', 'becky': '0002', 'lupe': '0003'}


router.get('/:user', function(req, res, next) {
	console.log(req.params.user)
	const payload = {
		'userID': users[req.params.user]
	}

	jwt.sign(payload, privateKey, signature, (err, token) => {
		if (err)
		{
			console.log(err)
			res.json({ JWT: null })
		}
		else	res.json({ JWT: token })
	})
})

module.exports = router
