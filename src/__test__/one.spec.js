const request = require('supertest')
const app = require('../server/server')

describe('Get Endpoint', () => {
  test("endpoint works", done => {
    request(app)
    .get('/')
    .then(response => {
        expect(response.status).toBe(200);
        done();
    });
  });
});