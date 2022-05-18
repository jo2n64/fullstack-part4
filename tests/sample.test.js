const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

test('registered blogs', async () => {
	const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
	expect(response.body).toHaveLength(2)
}, 100000)

test('property "id" exists', async () => {
	const blogs = await helper.blogsInDb()
	const firstBlog = blogs[0]
	expect(firstBlog.id).toBeDefined()
}, 100000)

test('blog added successfully', async () => {
	const blogsBeforeUpdate = await helper.blogsInDb()
	const newBlog = {
		title: 'test1',
		author: 'test mctesty',
		url: 'test.test',
		likes: 2093
	}
	await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

	const updatedBlogs = await helper.blogsInDb()
	expect(updatedBlogs).toHaveLength(blogsBeforeUpdate.length + 1)

})

afterAll(() => {
	mongoose.connection.close()
})