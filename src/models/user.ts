import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

const saltRounds = SALT_ROUNDS;
const pepper = BCRYPT_PASSWORD;

export type User = {
  id?: number | string;
  email?: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  password: string;
};

class UserStore {
  // INDEX method: gets the list of users
  async index(): Promise<User[]> {
    try {
      const connect = await Client.connect();
      const sql =
        'SELECT id, email, user_name, first_name, last_name FROM users';
      const result = await connect.query(sql);
      const users = result.rows;
      connect.release();
      return users;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }
  // SHOW method: gets a specific user from users table
  async show(id: number | string): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql = `SELECT id, email, user_name, first_name, last_name FROM users WHERE id=($1)`;
      const result = await connect.query(sql, [id]);
      const user = result.rows[0];
      connect.release();
      return user;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}.`);
    }
  }
  // CREATE method: creates a user (inserts values into users table)
  async create(u: User): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql =
        'INSERT INTO users (email, user_name, first_name, last_name, password_digest) VALUES($1, $2, $3, $4, $5) RETURNING id, email, user_name, first_name, last_name';
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await connect.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hash
      ]);
      const user = result.rows[0];
      connect.release();
      return user;
    } catch (err) {
      throw new Error(
        `Could not create user ${u.user_name}. Error: ${err as Error}`
      );
    }
  }
  // UPDATE method: updates data of user
  async update(u: User): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql = `UPDATE users SET email=($1), user_name=($2), first_name=($3), last_name=($4), password_digest=($5) WHERE id=($6) RETURNING id, email, user_name, first_name, last_name`;
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await connect.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hash,
        u.id
      ]);
      const user = result.rows[0];
      connect.release();
      return user;
    } catch (err) {
      throw new Error(`Couldn't update user.`);
    }
  }
  // DELETE method: deletes a user
  async delete(id: number | string): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id, email, user_name, first_name, last_name`;
      const result = await connect.query(sql, [id]);
      const user = result.rows[0];
      connect.release();
      return user;
    } catch (err) {
      throw new Error(`Couldn't delete user: ${id}.`);
    }
  }
  // AUTHENTICATE method: returns user data if the user is authenticated
  async authenticate(u: User): Promise<User | null> {
    try {
      const connect = await Client.connect();
      const sql = `SELECT password_digest FROM users WHERE user_name=($1)`;
      const result = await connect.query(sql, [u.user_name]);
      if (result.rows.length) {
        const user = result.rows[0];
        if (bcrypt.compareSync(u.password + pepper, user.password_digest)) {
          const userr = await connect.query(
            `SELECT id, email, user_name, first_name, last_name FROM users WHERE user_name=($1)`,
            [u.user_name]
          );
          connect.release();
          return userr.rows[0];
        }
      }
      connect.release();
      return null;
    } catch (err) {
      throw new Error('Authentication Error');
    }
  }
}

export default UserStore;
