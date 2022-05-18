const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('registered blogs', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(2)
}, 100000)

afterAll(() => {
	mongoose.connection.close()
})