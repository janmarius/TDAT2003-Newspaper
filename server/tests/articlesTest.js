// @flow
import { application } from '../src/server';
import request from 'supertest';
import { sync } from '../src/models.js';

beforeAll(async () => {
  await sync;
});


describe('Get all articles', () => {
  test('200 status code for GET /api/articles', done => {
    return request(application)
      .get('/api/articles')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Create new article', () => {
  test('200 status code for POST /api/articles', done => {
    return request(application)
      .post('/api/articles')
      .send({
        title: 'Some Title',
        body: 'Some body',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: true,
        category: 'Sport'
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('400 status code for POST /api/articles', done => {
    return request(application)
      .post('/api/articles')
      .send({
        title: 'Some Title',
        body: 'Some body',
        image:
          'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
        important: 'true',
        category: 'Sport'
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
