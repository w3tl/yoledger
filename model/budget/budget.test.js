import { MongoClient, ObjectId } from 'mongodb';
import config from '../../config';
import Budget from './index';
import Account from '../accounts';
import budgets from '../../mocks/budgets';
import accounts from '../../mocks/accounts';

let db;
let connection;
let budgetModel;
let budgetId;
let accountModel;

beforeAll(async () => {
  connection = await MongoClient.connect(config.get('mongoUri'), {
    connectWithNoPrimary: true,
    useNewUrlParser: true,
  });
  db = connection.db('dbbudgets');
  budgetModel = new Budget(db, 'user1');
  accountModel = new Account(db, 'user1');
  await accountModel.init();
  const expenseAccount = accounts.find(({ name }) => name === budgets[0].account);
  await accountModel.create(expenseAccount);
  await budgetModel.init();
  budgetId = await budgetModel.addBudget(budgets[0]);
});

afterAll(async () => {
  await connection.close();
});

describe('budget', () => {
  test('checkAccount', async () => {
    const budgetDoc = await budgetModel.findOne({ _id: budgetId });

    expect.assertions(2);
    await expect(budgetModel.checkAccount('blabla'))
      .rejects
      .toThrowError('Account not found');

    let error;
    try {
      await budgetModel.checkAccount(budgetDoc.account);
    } catch (err) {
      error = err;
    }
    expect(error).toBeUndefined();
  });

  test('Must add period', async () => {
    const budgetDoc = await budgetModel.findOne({ _id: budgetId });
    expect(budgetDoc).toMatchSnapshot({ _id: expect.any(ObjectId) }, 'New budget');
  });

  test('Must update period', async () => {
    const newAccount = accounts.find(({ name }) => name !== budgets[0].account);
    await accountModel.create(newAccount);
    const { result: { nModified } } = await budgetModel.updateBudget(budgetId, {
      account: newAccount.name,
      date: new Date('2018-01-10'),
      amount: 200,
    });
    expect(nModified).toEqual(1);
    const budgetDoc = await budgetModel.findOne({ _id: budgetId });
    expect(budgetDoc).toMatchSnapshot({ _id: expect.any(ObjectId) }, 'Updated budget period');
  });
});
