import supertest from 'supertest';
import app from '../../../server';
import UserStore, { User } from '../../../models/user';
import ProductStore, { Product } from '../../../models/product';
import OrderStore, { Order } from '../../../models/order';
import Client from '../../../database';

const store = new OrderStore();
const userstore = new UserStore();
const productstore = new ProductStore();

const request = supertest(app);
let token = '';

describe('Test orders routes responses', () => {
  const order1: Order = { status: 'active', user_id: 1 };
  const order2: Order = { status: 'complete', user_id: 1 };

  const user: User = {
    email: 'hadir@gmail.com',
    user_name: 'h_taiel',
    first_name: 'Hadir',
    last_name: 'Wahid',
    password: '00000'
  };
  const product: Product = {
    name: 'lipstick',
    price: '10',
    category: 'cosmetics'
  };

  beforeAll(async () => {
    await userstore.create(user);
    await productstore.create(product);
    await store.create(order1);
    await store.create(order2);
    const response = await request
      .post('/api/users/authenticate')
      .set('Content-type', 'application/json')
      .send({ user_name: 'h_taiel', password: '00000' });
    token = response.body.token;
  });

  afterAll(async () => {
    const connect = await Client.connect();
    const sql =
      'ALTER SEQUENCE users_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n DELETE FROM order_products;\n DELETE FROM orders;\n DELETE FROM products;\n DELETE FROM users;';
    await connect.query(sql);
    connect.release();
  });

  it('Tests INDEX route response', async (): Promise<void> => {
    const response = await request
      .get('/api/orders/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(1);
    expect(bodyData[0].status).toEqual('active');
    expect(bodyData[0].user_id).toEqual('1');
    expect(bodyData[1].id).toEqual(2);
    expect(bodyData[1].status).toEqual('complete');
    expect(bodyData[1].user_id).toEqual('1');
    expect(bodyData.length).toEqual(2);
  });

  it('Tests GET CURRENT ORDER route response', async (): Promise<void> => {
    const response = await request
      .get('/api/orders/current/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData.id).toEqual(1);
    expect(bodyData.status).toEqual('active');
    expect(bodyData.user_id).toEqual('1');
  });

  it('Tests GET COMPLETED ORDERS route response', async (): Promise<void> => {
    const response = await request
      .get('/api/orders/completed/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData[0].id).toEqual(2);
    expect(bodyData[0].status).toEqual('complete');
    expect(bodyData[0].user_id).toEqual('1');
    expect(bodyData.length).toEqual(1);
  });

  it('Tests ADD PRODUCTS route response', async (): Promise<void> => {
    const response = await request
      .post('/api/orders/1/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({ product_id: '1', quantity: '5' });
    expect(response.status).toBe(200);
    const bodyData = response.body.data;
    expect(bodyData.id).toEqual(1);
    expect(bodyData.quantity).toEqual(5);
    expect(bodyData.order_id).toEqual('1');
    expect(bodyData.product_id).toEqual('1');
  });
});
