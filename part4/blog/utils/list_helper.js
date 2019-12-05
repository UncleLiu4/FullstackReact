const blogs = [{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (accumulator, currentValue) => accumulator + Number(currentValue.likes)
	return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
	let maxLikes = 0, favorite = null
	for(const blog of blogs) {
		const likes = Number(blog.likes)
		if(likes > maxLikes) {
			maxLikes = likes
			favorite = blog
		}
	}
	const { title, author, likes } = favorite
	return { title, author, likes }
}

const mostBlogs = blogs => {
	let maxBlogAuthor, maxBlogCount = 0, authorBlogNum = {}
	for(const blog of blogs) {
		const author = blog.author
		if(authorBlogNum[author] === undefined) {
			authorBlogNum[author] = 1
		} else {
			authorBlogNum[author]++
			if(authorBlogNum[author] > maxBlogCount) {
				maxBlogCount = authorBlogNum[author]
				maxBlogAuthor = author
			}
		}
	}

	return { author: maxBlogAuthor, blogs: maxBlogCount,  }
}

const mostLikes = blogs => {
	let maxLikesAuthor, maxLikesCount = 0, authorLikeNum = {}
	for(const blog of blogs) {
		const { author, likes } = blog
		if(authorLikeNum[author] === undefined) {
			authorLikeNum[author] = likes
		} else {
			authorLikeNum[author] += likes
			if(authorLikeNum[author] > maxLikesCount) {
				maxLikesCount = authorLikeNum[author]
				maxLikesAuthor = author
			}
		}
	}

	return { author: maxLikesAuthor, likes: maxLikesCount,  }
}

// console.log(mostLikes(blogs));

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
