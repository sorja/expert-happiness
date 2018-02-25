const totalLikes = (blogs) => {
    if (!blogs.length) { return 0 }
    return blogs.reduce((a, c) => a + c.likes, 0)
}

const favoriteBlog = blogs => {
    let b = { likes: 0 }
    blogs.forEach(
        blog => {
            if (blog.likes > b.likes)
                b = blog
        }
    )
    return b;
}

const mostBlogs = blogs => {
    const _b = {}
    const most = {
        blogs: 0
    }
    blogs.forEach(
        v => {
            if (!_b[v.author]) {
                _b[v.author] = 0
            }
            _b[v.author]++

            if(_b[v.author] > most.blogs){
                most.blogs = _b[v.author]
                most.author = v.author
            }

        }
    )
    return most
}
const mostLikes = blogs => {
    const _b = {}
    const most = {
        likes: 0
    }
    blogs.forEach(
        v => {
            if (!_b[v.author]) {
                _b[v.author] = 0
            }
            _b[v.author] += v.likes

            if(_b[v.author] > most.likes){
                most.likes = _b[v.author]
                most.author = v.author
            }

        }
    )
    return most
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
