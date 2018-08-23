jest.mock('./auth');
const auth = require('./auth');

auth.createCredentials.mockReturnValue({
  algorithm: 'very strong algorithm',
  createdAt: new Date('2018-06-20'),
  salt: 'random last',
  hash: 'crypto hash',
  valid: true,
});

import { MongoClient } from 'mongodb';
import config from '../../config';
import User from './index';

const RealDate = Date;
function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor() {
      super();
      return new RealDate(isoDate);
    }
  };
}

let connection;
let db;

describe('user', () => {
  beforeAll(async () => {
    mockDate('2018-06-20');
    connection = await MongoClient.connect(config.get('mongoUri'), {
      connectWithNoPrimary: true,
      useNewUrlParser: true,
    });
    db = connection.db('dbusers');
    const userModel = new User(db, 'dumb');
    await userModel.init();
  });

  afterAll(async () => {
    global.Date = RealDate;
    await connection.close();
  });

  test('create new user', async () => {
    const userModel = new User(db, 'admin');
    const user = await userModel.create({ password: 'password' });
    expect(user).toMatchSnapshot();
  });
});
