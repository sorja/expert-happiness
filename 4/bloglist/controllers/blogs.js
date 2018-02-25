const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async(request, response) => {
  const b = request.body
  
  if (!b.title || !b.author || !b.url) {
    response.status(400)
    response.send("Error")
  } else {
    const blog = new Blog(b)
    await blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.deleteOne(request.params.id)
  response.sendStatus(200)
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes })
  response.sendStatus(200)
})

module.exports = blogsRouter