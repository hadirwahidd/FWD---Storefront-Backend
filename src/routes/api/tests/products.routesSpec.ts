import supertest from 'supertest';
import app from '../../../server';
import ProductStore, { Product } from '../../../models/product';
import UserStore, { User } from '../../../models/user';
import Client from '../../../database';

const store = new ProductStore();
const userstore = new UserStore();

const request = supertest(app);
let token = '';

describe('Products routes responses', () => {
  const product: Product = {
    name: 'lipstick',
    price: '10',
    category: 'cosmetics'
  };

  const user: User = {
    email: 'hadir@gmail.com',
    user_name: 'h_taiel',
    first_name: 'Hadir',
    last_name: 'Wahid',
    password: '00000'
  };

  beforeAll(async () => {
    await store.create(product);
    await userstore.create(user);
    const response = await request
      .post('/api/users/authenticate')
      .set('Content-type', 'application/json')
      .send({ user_name: 'h_taiel', password: '00000' });
    token = response.body.token;
  });

  afterAll(async () => {
    const connect = await Client.connect();
    const sql =
      'ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM users;';
    await connect.query(sql);
    connect.release();
  });

  it('Tests CREATE route response', async (): Promise<void> => {
    const response = await request
      .post('/api/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'sunblock',
        price: '30',
        category: 'cosmetics'
      });
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData.id).toEqual(2);
    expect(bodyData.price).toEqual(30);
  });

  it('Tests INDEX route response', async (): Promise<void> => {
    const response = await request.get('/api/products');
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(1);
    expect(bodyData[1].id).toEqual(2);
  });

  it('Tests GET BY CATEGORY route response', async (): Promise<void> => {
    const response = await request.get('/api/products/category/cosmetics');
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(1);
    expect(bodyData[1].id).toEqual(2);
  });

  it('Tests SHOW route response', async (): Promise<void> => {
    const response1 = await request.get('/api/products/id/1');
    const response2 = await request.get('/api/products/id/2');
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    const bodyData1 = response1.body.data;
    const bodyData2 = response2.body.data;
    expect(bodyData1.id).toEqual(1);
    expect(bodyData2.id).toEqual(2);
    expect(bodyData1.category).toEqual('cosmetics');
    expect(bodyData2.category).toEqual('cosmetics');
  });
});
