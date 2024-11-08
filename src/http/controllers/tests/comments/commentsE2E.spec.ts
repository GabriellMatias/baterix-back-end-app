import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Comments E2E', () => {
  let commentId: string

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a comment', async () => {
    const response = await request(app.server).post('/comments').send({
      userId: 'user1',
      postId: 'post1',
      content: 'This is a test comment',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.content).toEqual('This is a test comment')

    commentId = response.body.id // salva o ID para futuros testes
  })

  it('should be able to retrieve a comment by ID', async () => {
    const response = await request(app.server).get(`/comments/${commentId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.id).toEqual(commentId)
    expect(response.body.content).toEqual('This is a test comment')
  })

  it('should be able to update a comment', async () => {
    const response = await request(app.server)
      .put(`/comments/${commentId}`)
      .send({
        content: 'Updated comment content',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.content).toEqual('Updated comment content')
  })

  it('should be able to delete a comment', async () => {
    const response = await request(app.server).delete(`/comments/${commentId}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.id).toEqual(commentId)
  })

  it('should be able to retrieve all comments by a user ID', async () => {
    // Primeiro, cria alguns comentários
    await request(app.server).post('/comments').send({
      userId: 'user1',
      postId: 'post1',
      content: 'User 1 comment 1',
    })
    await request(app.server).post('/comments').send({
      userId: 'user1',
      postId: 'post2',
      content: 'User 1 comment 2',
    })

    const response = await request(app.server).get('/comments/user/user1')

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(2)
  })

  it('should be able to retrieve all comments by post ID', async () => {
    const response = await request(app.server).get('/comments/post/post1')

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body[0].postId).toEqual('post1')
  })
})
