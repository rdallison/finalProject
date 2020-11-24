const request = require('supertest')
const app = require('../server/server')

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })
  

describe('Get Endpoint', () => {
  test("endpoint works", () => {
    request(app)
    .get('/')
    .then(response => {
        expect(response.status).toBe(200);
    });
  });
});

