const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds with Hello', async () => {
    const res = await request(app).get('/');
    expect(res.text).toMatch(/Hello/);
    expect(res.statusCode).toBe(200);
  });
});
