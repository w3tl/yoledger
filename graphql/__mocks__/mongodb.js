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
    find: query => ({
      toArray: () => {
        if ('type' in query) {
          return Promise.resolve(accounts.filter(acc => query.type === acc.type));
        }
        if ('name' in query) {
          if ('$in' in query.name) {
            const result = accounts.filter(({ name }) => query.name.$in.indexOf(name) !== -1);
            return Promise.resolve(result);
          }
        }
        return Promise.resolve([]);
      },
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
      const idx = budgets
        .findIndex(b => b.date.getTime() === date.getTime() && b.account === account);
      if (idx) {
        budgets[idx] = { ...budgets[idx], ...$set.modificator };
      }
      return Promise.resolve({ upsertedId: budgets[idx]._id });
    },
    aggregate: ([$match, $group]) => ({
      toArray: () => {
        if ('date' in $group.$group._id) {
          return [{
            _id: { date: new Date('2018-05-10') },
            allocations: [
              { account: 'Food', amount: 50, balance: 0 },
            ],
          }, {
            _id: { date: new Date('2018-05-25') },
            allocations: [
              { account: 'Food', amount: 55, balance: 0 },
            ],
          }, {
            _id: { date: new Date('2018-06-10') },
            allocations: [
              { account: 'Food', amount: 60, balance: 0 },
              { account: 'Train', amount: 14, balance: 0 },
            ],
          }];
        }
        return [
          accounts.find(a => a.name === 'Food'),
          accounts.find(a => a.name === 'Train'),
        ];
      },
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
