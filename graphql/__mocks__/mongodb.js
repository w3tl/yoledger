import {
  users,
  transactions as transactionsJson,
  accounts,
  budgets as budgetsJson,
} from '../mocks';

const mongodb = jest.genMockFromModule('mongodb');

const addCreatedAt = ({ createdAt, ...other }) => ({ ...other, createdAt: new Date(createdAt) });
const addDate = ({ date, ...other }) => ({ ...other, date: new Date(date) });
const transactions = transactionsJson.map(addCreatedAt);
const budgets = budgetsJson.map(addDate);

const mockSession = {
  startTransaction: () => Promise.resolve(),
  commitTransaction: () => Promise.resolve(),
  abortTransaction: () => Promise.reject({ // eslint-disable-line prefer-promise-reject-errors
    errorLabels: ['TransientTransactionError'],
  }),
};

const mockCollections = {
  users: {
    findOne: ({ _id }) => Promise.resolve(users.find(u => u._id === _id)),
  },
  transactions: {
    find: () => ({
      skip: skip => ({
        limit: limit => ({
          toArray: () => transactions.slice(skip, skip + limit),
        }),
      }),
    }),
    findOne: ({ _id }) => Promise.resolve(transactions.find(t => t._id === _id)),
    insertOne: (transaction) => {
      transactions.push({ _id: '50', ...transaction });
      return Promise.resolve({ insertedId: '50' });
    },
    findOneAndDelete: ({ id }) => Promise.resolve({ value: transactions.find(t => t.id === id) }),
    updateOne: () => Promise.resolve(),
  },
  accounts: {
    find: ({ type }) => ({
      toArray: () => Promise.resolve(accounts.filter(acc => type === acc.type)),
    }),
    findOne: ({ name, _id }) => Promise.resolve(
      accounts.find(acc => name === acc.name || _id === acc._id),
    ),
    insertOne: (account) => {
      accounts.push({ _id: '44', ...account });
      return Promise.resolve({ insertedId: '44' });
    },
    updateOne: () => Promise.resolve(),
  },
  budget: {
    findOne: ({ _id, date }) => {
      if (_id) { return Promise.resolve(budgets.find(t => t._id === _id)); }
      if (date) { return Promise.resolve(budgets.find(t => t.date.getTime() === date.getTime())); }
      return budgets[0];
    },
    updateOne: ({ date, account }, { $set }) => {
      const idx = budgets.find(b => b.date.getTime() === date.getTime() && b.account === account);
      if (idx) {
        budgets[idx] = { ...budgets[idx], ...$set.modificator };
      }
      return Promise.resolve({ upsertedId: budgets[idx]._id });
    },
    aggregate: () => ({
      toArray: () => ([{
        _id: { account: 'Train' },
        allocations: [
          { date: new Date('2018-06-10'), amount: 14, balance: 0 },
        ],
      }, {
        _id: { account: 'Food' },
        allocations: [
          { date: new Date('2018-05-10'), amount: 50, balance: 0 },
          { date: new Date('2018-05-25'), amount: 55, balance: 0 },
          { date: new Date('2018-06-10'), amount: 60, balance: 0 },
        ],
      }]),
    }),
  },
};


mongodb.connection = {
  db: () => ({
    collection: name => mockCollections[name],
  }),
  withSession: callback => callback(mockSession),
};

module.exports = mongodb;
