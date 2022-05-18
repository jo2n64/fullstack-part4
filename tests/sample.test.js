const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

test('registered blogs', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(2)
}, 100000)

test('property "id" exists', async () => {
	const blogs = await Blog.find({})
	const firstBlog = blogs[0]
	expect(firstBlog.id).toBeDefined()
}, 100000)

afterAll(() => {
	mongoose.connection.close()
})