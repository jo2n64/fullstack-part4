const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
	const { username, password, name } = request.body

	if (username === undefined || password === undefined || name === undefined) {
		return response.status(400).json({ error: 'missing user properties!' })
	}

	const userExisting = await User.findOne({ username })
	if (userExisting) {
		return response.status(400).json({ error: 'username must be unique!' })
	}

	const saltRounds = 10
	const passwordHash = await bcryptjs.hash(password, saltRounds)

	const user = new User({
		username,
		passwordHash,
		name
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs')
	response.json(users)
})

module.exports = usersRouter