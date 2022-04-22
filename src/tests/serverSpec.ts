import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Main endpoint responses', () => {
  it('Tests main route (localhost:3000/) response', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Tests main API route (localhost:3000/api) response', async (): Promise<void> => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});
