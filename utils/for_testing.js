const lo_dash = require('lodash')

const reverse = (string) => {
	return string
		.split('')
		.reverse()
		.join('')
}

const average = (array) => {
	const reducer = (sum, item) => {
		return sum + item
	}

	return array.length === 0
		? 0
		: array.reduce(reducer, 0) / array.length
}

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let totalLikes = 0
	for (const blog of blogs) {
		totalLikes += blog.likes
	}
	return totalLikes
}

const favoriteBlog = (blogs) => {
	const blogWithMostLikes = blogs.find(blog => blog.likes === Math.max(...blogs.map(b => b.likes)))
	return blogWithMostLikes
}

const mostBlogs = (blogs) => {
	const counts = {}
	const bloggers = []
	for (const blog of blogs) {
		counts[blog.author] = (counts[blog.author] || 0) + 1
	}
	Object.entries(counts).forEach(([k, v]) => {
		const obj = {
			author: k,
			blogs: v
		}
		bloggers.push(obj)
	})
	bloggers.sort((a, b) => {
		return a.blogs - b.blogs
	})
	return bloggers[bloggers.length - 1]
}

const mostAuthorLikes = (blogs) => {
	const stuff = []
	const authorNames = {}
	const authorNamesOnly = []
	// get the author names from list
	for (const blog of blogs) {
		authorNames[blog.author] = (authorNames[blog.author] || 0) + 1
	}
	//put them in list cuz idk how to do it better
	Object.entries(authorNames).forEach(([k, v]) => {
		const obj = {
			author: k,
			likes: 0
		}
		authorNamesOnly.push(obj)
	})
	//get every blog and its likes
	for (const blog of blogs) {
		const obj = {
			author: blog.author,
			likes: blog.likes
		}
		stuff.push(obj)
	}
	//sum likes by checking same name
	for (const obj of authorNamesOnly) {
		for (const blog of stuff) {
			if (obj.author === blog.author) {
				obj.likes += blog.likes
			}
		}
	}
	authorNamesOnly.sort((a, b) => {
		return a.likes - b.likes
	})
	return authorNamesOnly[authorNamesOnly.length - 1]
}

module.exports = {
	reverse,
	average,
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostAuthorLikes,
}