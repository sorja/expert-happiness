const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { newBlog, badBlog } = require('./helper')

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog is created', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})


test('bad blog is not created', async () => {
    await api
    .post('/api/blogs')
    .send(badBlog)
    .expect(400)
})

afterAll(() => {
  server.close()
})
