// @flow
import { application } from '../src/server';
import request from 'supertest';
import { sync } from '../src/models.js';

beforeAll(async () => {
  await sync;
});

describe('Get all categories', () => {
  test('200 status code for GET /api/categories', done => {
    return request(application)
      .get('/api/categories')
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
