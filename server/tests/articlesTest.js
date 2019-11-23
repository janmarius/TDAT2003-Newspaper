// @flow
import { application } from '../src/server';
import request from 'supertest';
import { sync } from '../src/models.js';

beforeAll(async () => {
  await sync;
});

let temp_id = 1;
let temp_category = 'News';

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

describe('Get all articles in category', () => {
  test('200 status code for GET /api/articles/category/:category', done => {
    return request(application)
      .get(`/api/articles/category/${temp_category}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Get article in category by ID', () => {
  test('test 200 status code for GET /api/articles/category/:category/id/:id', done => {
    return request(application)
      .get(`/api/articles/category/${temp_category}/id/${temp_id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Update one article', () => {
  test('200 status code for PUT /api/articles/category/:category/id/:id', done => {
    return request(application)
      .put(`/api/articles/category/${temp_category}/id/${temp_id}`)
      .send({
        id: temp_id,
        title: 'Update Title',
        body: 'Update body',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: temp_category
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('400 status code for PUT /api/articles/category/:category/id/:id', done => {
    return request(application)
      .put(`/api/articles/category/${temp_category}/id/${temp_id}`)
      .send({
        id: 'One',
        title: 'Update Title',
        body: 'Update body',
        image:
          'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
        important: true,
        category: temp_category
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});

describe('Delete one article', () => {
  test('200 status code for DELETE /api/articles/category/:category/id/:id', done => {
    return request(application)
      .delete(`/api/articles/category/${temp_category}/id/${temp_id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('400 status code for DELETE /api/articles/category/:category/id/:id', done => {
    return request(application)
      .delete(`/api/articles/category/${temp_category}/id/999`)
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
