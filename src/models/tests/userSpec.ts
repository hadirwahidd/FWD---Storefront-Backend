import UserStore, { User } from '../user';
import Client from '../../database';

const store = new UserStore();

describe('User Model methods definition', () => {
  it('Should have an INDEX method', () => {
    expect(store.index).toBeDefined();
  });

  it('Should have a SHOW method', () => {
    expect(store.show).toBeDefined();
  });

  it('Should have a CREATE method', () => {
    expect(store.create).toBeDefined();
  });

  it('Should have a UPDATE method', () => {
    expect(store.update).toBeDefined();
  });

  it('Should have a DELETE method', () => {
    expect(store.delete).toBeDefined();
  });

  it('Should have an AUTHENTICATE method', () => {
    expect(store.authenticate).toBeDefined();
  });
});

describe('User Model methods logic', () => {
  const user1: User = {
    email: 'hadir@gmail.com',
    user_name: 'h_taiel',
    first_name: 'Hadir',
    last_name: 'Wahid',
    password: '00000'
  };

  const user2: User = {
    email: 'mohamed@gmail.com',
    user_name: 'mwahidd',
    first_name: 'Muhamed',
    last_name: 'Wahid',
    password: '00000'
  };

  const updatedUser1: User = {
    email: 'hadirr@gmail.com',
    user_name: 'h_taiell',
    first_name: 'Hadir',
    last_name: 'Wahid',
    password: '00000',
    id: 1
  };

  beforeAll(async () => {
    await store.create(user1);
  });

  afterAll(async () => {
    const connect = await Client.connect();
    const sql =
      'ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM users;';
    await connect.query(sql);
    connect.release();
  });

  it('CREATE method should return user data along with the id', async () => {
    const result = await store.create(user2);
    expect(result.id).toEqual(2);
  });

  it('INDEX method should return a list of users and the right number of users', async () => {
    const result = await store.index();
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);
    expect(result[0].user_name).toEqual('h_taiel');
    expect(result[1].user_name).toEqual('mwahidd');
    expect(result.length).toEqual(2);
  });

  it('SHOW method should return user data along with the id', async () => {
    const result1 = await store.show(1);
    const result2 = await store.show(2);
    expect(result1.id).toEqual(1);
    expect(result2.id).toEqual(2);
    expect(result1.user_name).toEqual('h_taiel');
    expect(result2.user_name).toEqual('mwahidd');
  });

  it('UPDATE method should return user updated data along with the id', async () => {
    const result = await store.update(updatedUser1);
    expect(result.id).toEqual(1);
    expect(result.user_name).toEqual('h_taiell');
    expect(result.email).toEqual('hadirr@gmail.com');
  });

  it('AUTHENTICATE method should return authenticated user data', async () => {
    // here we make sure to run the test with the updated user
    const result = await store.authenticate(updatedUser1);
    expect(result?.user_name).toEqual('h_taiell');
  });

  it('AUTHENTICATE method should fail with false user data', async () => {
    // wrong password
    const wrongUser1: User = {
      email: 'hadirr@gmail.com',
      user_name: 'h_taiel',
      password: '00hm000'
    };
    // wrong user name
    const wrongUser2: User = {
      email: 'hadirr@gmail.com',
      user_name: 'h__tail',
      password: '00000'
    };
    const result1 = await store.authenticate(wrongUser1);
    const result2 = await store.authenticate(wrongUser2);
    expect(result1).toBe(null);
    expect(result2).toBe(null);
  });

  it('DELETE method should return deleted user data along with the id', async () => {
    const result1 = await store.delete(1);
    const result2 = await store.delete(2);
    expect(result1.id).toEqual(1);
    expect(result2.id).toEqual(2);
    expect(result1.user_name).toEqual('h_taiell');
    expect(result2.user_name).toEqual('mwahidd');
  });
});
