import Client from '../database';

export type Product = {
  id?: number | string;
  name: string;
  price: string;
  category?: string;
};

class ProductStore {
  // INDEX method: gets the list of products
  async index(): Promise<Product[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connect.query(sql);
      const products = result.rows;
      connect.release();
      return products;
    } catch (err) {
      throw new Error(`Unable to get products ${err}`);
    }
  }
  // GET BY CATEGORY method: gets a list of products by their category
  async getByCategory(category: string): Promise<Product[]> {
    try {
      const connect = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category=($1)';
      const result = await connect.query(sql, [category]);
      const products = result.rows;
      connect.release();
      return products;
    } catch (err) {
      throw new Error(
        `Could not find products by this category: ${category}. ${err}`
      );
    }
  }
  // SHOW method: gets a specific product from products table
  async show(id: number | string): Promise<Product> {
    try {
      const connect = await Client.connect();
      const sql = `SELECT * FROM products WHERE id=($1)`;
      const result = await connect.query(sql, [id]);
      const product = result.rows[0];
      connect.release();
      return product;
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err as Error}`);
    }
  }
  // CREATE method: creates a product (inserts values into products table)
  async create(p: Product): Promise<Product> {
    try {
      const connect = await Client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await connect.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      connect.release();
      return product;
    } catch (err) {
      throw new Error(`Could not create product ${p.name}. ${err as Error}`);
    }
  }
}

export default ProductStore;
