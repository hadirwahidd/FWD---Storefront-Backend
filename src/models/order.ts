import Client from '../database';

export type Order = {
  id?: number | string;
  status: string;
  user_id: number | string;
};

class OrderStore {
  // CREATE method: (for testing)
  async create(o: Order): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING id, status, user_id';
      const result = await connect.query(sql, [o.status, o.user_id]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err as Error}`);
    }
  }
  // INDEX method: gets the list of all orders by user
  async index(id: number | string): Promise<Order[]> {
    try {
      const connect = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1)`;
      const result = await connect.query(sql, [id]);
      const orders = result.rows;
      connect.release();
      return orders;
    } catch (err) {
      throw new Error(`Unable to get orders by user ${id}. ${err}.`);
    }
  }
  // GET CURRENT ORDER method: gets current order by user
  async getCurrentOrder(id: number | string): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='active'`;
      const result = await connect.query(sql, [id]);
      const currentOrder = result.rows[0];
      connect.release();
      return currentOrder;
    } catch (err) {
      throw new Error(`Unable to get current order. Error: ${err}.`);
    }
  }
  // GET COMPLETED ORDERS method: gets the list of completed orders by user
  async getCompletedOrders(id: number | string): Promise<Order[]> {
    try {
      const connect = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id=($1) AND status='complete'`;
      const result = await connect.query(sql, [id]);
      const completedOrders = result.rows;
      connect.release();
      return completedOrders;
    } catch (err) {
      throw new Error(`Unable to get completed orders. ${err}.`);
    }
  }
  // ADD PRODUCT method: adds a product to an order
  async addProduct(
    quantity: number,
    order_id: number | string,
    product_id: number | string
  ) {
    try {
      const connect = await Client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connect.query(sql, [quantity, order_id, product_id]);
      const order = result.rows[0];
      connect.release();
      return order;
    } catch (err) {
      throw new Error(
        `Couldn't add product ${product_id} to order ${order_id}. ${err}`
      );
    }
  }
}

export default OrderStore;
