const router = require('express').Router()
const fs = require('fs')
const jwt = require('jsonwebtoken')

const publicKey = fs.readFileSync('./keys/public.key')

const verifyOptions = {
	issuer: 'backend',
	subject: 'login',
	audience: 'http://localhost:3000',
	expiresIn: "1m",
	algorithm: ["RS256"]
}

const user_info = {
	'0001': {
		'name': 'Javi Gomez',
		'age': 26,
	},
	'0002': {
		'name': 'Becky Craven',
		'age': 28,
	},
	'0003': {
		'name': 'Lupe Gomez',
		'age': 15,
	},
}


router.get('/', (req, res, err) => {
	let token = req.headers.authorization

	jwt.verify(token, publicKey, verifyOptions, (err, payload) => {
		if (err)
		{
			switch(err.name)
			{
				case 'TokenExpiredError':
					res.send('Provided JWT has expired - no access granted')
					break
				case 'JsonWebTokenError':
					res.send('No JWT token was provided in Authorization header')
					break
				default:
					res.json(err)
			}
		}
		else
		{
			console.log(payload.userID)
			res.json(user_info[payload.userID])
		}
	})
})

module.exports = router