// @flow
import { application } from '../src/server';
import request from 'supertest';
import { sync } from '../src/models.js';

beforeAll(async () => {
  await sync;
});

let temp_id = 1;

describe('Get all comments', () => {
  test('200 status code for GET /api/comments/article_id/:article_id', done => {
    return request(application)
      .get(`/api/comments/article_id/${temp_id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe('Add comment', () => {
  test('200 status code for POST /api/comments/article_id/:article_id/new', done => {
    return request(application)
      .post(`/api/comments/article_id/${temp_id}/new`)
      .send({
        nickname: 'Bob',
        comment: 'I am Bob',
        article_id: temp_id
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test('400 status code for POST /api/comments/article_id/:article_id/new', done => {
    return request(application)
      .post(`/api/comments/article_id/${temp_id}/new`)
      .send({
        nickname: true,
        comment: 'I am Bob',
        article_id: temp_id
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
