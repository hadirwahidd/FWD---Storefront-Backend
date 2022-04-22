import ProductStore, { Product } from '../product';
import Client from '../../database';

const store = new ProductStore();

describe('Product Model methods definition', () => {
  it('Should have an INDEX method', () => {
    expect(store.index).toBeDefined();
  });

  it('Should have a GET BY CATEGORY method', () => {
    expect(store.getByCategory).toBeDefined();
  });

  it('Should have a SHOW method', () => {
    expect(store.show).toBeDefined();
  });

  // create method is only for testing
  it('Should have a CREATE method', () => {
    expect(store.create).toBeDefined();
  });
});

describe('Product Model methods logic', () => {
  const product1: Product = {
    name: 'lipstick',
    price: '10',
    category: 'cosmetics'
  };

  const product2: Product = {
    name: 'sunblock',
    price: '30',
    category: 'cosmetics'
  };

  beforeAll(async () => {
    await store.create(product1);
  });

  afterAll(async () => {
    const connect = await Client.connect();
    const sql =
      'ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM products;';
    await connect.query(sql);
    connect.release();
  });

  it('CREATE method should return created product data along with the id', async () => {
    const result = await store.create(product2);
    expect(result.id).toEqual(2);
  });

  it('INDEX method should return a list of products', async () => {
    const result = await store.index();
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
  });

  it('GET BY CATEGORY method should return a list of products with a specific category', async () => {
    const result = await store.getByCategory('cosmetics');
    expect(result[0].category).toEqual('cosmetics');
    expect(result[1].category).toEqual('cosmetics');
  });

  it('SHOW method should return a specific product data along with the id', async () => {
    const result1 = await store.show(1);
    const result2 = await store.show(2);
    expect(result1.id).toEqual(1);
    expect(result2.id).toEqual(2);
  });
});
