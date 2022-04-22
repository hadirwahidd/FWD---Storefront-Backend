import supertest from 'supertest';
import app from '../../../server';
import UserStore, { User } from '../../../models/user';
import Client from '../../../database';

const store = new UserStore();

const request = supertest(app);
export let token = '';

describe('Users routes responses', () => {
  const user: User = {
    email: 'hadir@gmail.com',
    user_name: 'h_taiel',
    first_name: 'Hadir',
    last_name: 'Wahid',
    password: '00000'
  };

  beforeAll(async () => {
    await store.create(user);
  });

  afterAll(async () => {
    const connect = await Client.connect();
    const sql =
      'ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM users;';
    await connect.query(sql);
    connect.release();
  });

  it('Tests AUTHENTICATE route response to get a token', async (): Promise<void> => {
    const response = await request
      .post('/api/users/authenticate')
      .set('Content-type', 'application/json')
      .send({
        user_name: 'h_taiel',
        password: '00000'
      });
    expect(response.status).toBe(200);
    token = response.body.token;
    const body = response.body;
    expect(body.data.id).toEqual(1);
    expect(body.data.user_name).toEqual('h_taiel');
  });

  it('Tests CREATE route response', async (): Promise<void> => {
    const response = await request
      .post('/api/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'mohamed@gmail.com',
        user_name: 'mwahidd',
        first_name: 'Muhamed',
        last_name: 'Wahid',
        password: '00000'
      });
    expect(response.status).toBe(200);
    const body = response.body;
    expect(body.data.id).toEqual(2);
    expect(body.data.user_name).toEqual('mwahidd');
    expect(body.token).toBeDefined;
  });

  it('Tests INDEX route response', async (): Promise<void> => {
    const response = await request
      .get('/api/users')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(1);
    expect(bodyData[1].id).toEqual(2);
  });

  it('Tests SHOW route response', async (): Promise<void> => {
    const response = await request
      .get('/api/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const body = response.body;
    expect(body.data.id).toEqual(1);
    expect(body.data.user_name).toEqual('h_taiel');
    expect(body.token).toBeDefined;
  });

  it('Tests UPDATE route response', async (): Promise<void> => {
    const response = await request
      .put('/api/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'hadir@gmail.com',
        user_name: 'h_taiell',
        first_name: 'Hadir',
        last_name: 'Wahid',
        password: '00000'
      });
    expect(response.status).toBe(200);
    const body = response.body;
    expect(body.data.id).toEqual(1);
    expect(body.data.user_name).toEqual('h_taiell');
    expect(body.token).toBeDefined;
  });

  it('Tests DELETE route response', async (): Promise<void> => {
    const response = await request
      .delete('/api/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const body = response.body;
    expect(body.data.id).toEqual(1);
  });
});
