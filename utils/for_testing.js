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

module.exports = {
	reverse,
	average,
	dummy,
	totalLikes,
	favoriteBlog,
}