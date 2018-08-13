import { MongoClient, ObjectId } from 'mongodb';
import config from '../../config';
import Budget from './index';
import budgets from '../../mocks/budgets';

let db;
let connection;
let budgetModel;

beforeAll(async () => {
  connection = await MongoClient.connect(config.get('mongoUri'), {
    connectWithNoPrimary: true,
    useNewUrlParser: true,
  });
  db = connection.db('dbbudgets');
  budgetModel = new Budget(db, 'admin');
  await budgetModel.init();
});

afterAll(async () => {
  await connection.close();
});

describe('budget', () => {
  test('periods func should return correct array', () => {
    const periodSetting = {
      type: 'dayOfMonth',
      options: [10, 25],
    };

    const periods = ['2017-12-24', '2017-12-25', '2017-12-26', '2018-01-9', '2018-01-10', '2018-01-11', '2018-01-26'];

    periods.forEach(dateStr => expect(
      Budget.periods(new Date(dateStr), 3, periodSetting),
    ).toMatchSnapshot(dateStr));
  });

  describe('upsertBudget', () => {
    beforeAll(async () => {
      await budgetModel.clear();
      await budgetModel
        .insertMany(
          budgets.map(({ date, ...other }) => ({ date: new Date(date), ...other })),
        );
    });

    afterAll(async () => {
      await budgetModel.clear();
      await budgetModel
        .insertMany(
          budgets.map(({ date, ...other }) => ({ date: new Date(date), ...other })),
        );
    });

    test('should update the amount in the existing period', async () => {
      const { date, account } = budgets[0];
      await budgetModel.upsertBudget({
        account,
        date,
        amount: 14,
      });
      const doc = await budgetModel.findOne({ date: new Date(date) });
      expect(doc).toMatchSnapshot({
        _id: expect.any(ObjectId),
      }, `should contain "${account}" account with amount of 14`);
    });

    test('should add a budget to the existing period', async () => {
      const { date } = budgets[0];
      await budgetModel.upsertBudget({
        account: 'twix',
        date,
        amount: 15,
      });
      const doc = await budgetModel.findOne({ date: new Date(date) });
      expect(doc).toMatchSnapshot({
        _id: expect.any(ObjectId),
      }, 'should contain "twix" account with amount of 15');
    });

    test('should create a non-existent period with a budget', async () => {
      const date = new Date('2018-01-13');
      await budgetModel.upsertBudget({
        account: 'twix',
        date,
        amount: 15,
      });
      const doc = await budgetModel.findOne({ date });
      expect(doc).toMatchSnapshot({
        _id: expect.any(ObjectId),
      }, 'should contain "twix" account with amount of 15');
    });
  });
});
