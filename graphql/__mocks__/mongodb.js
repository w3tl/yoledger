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
let budgets = budgetsJson.map(addDate);

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
    find: ({ account, $and: [{ date: { $gte } }, { date: { $lte } }] }) => ({
      toArray: () => {
        const dateFiltered = budgets.filter(({ date }) => date >= $gte && date <= $lte);
        if (!account) return Promise.resolve(dateFiltered);
        return Promise.resolve(dateFiltered.filter(budget => budget.account === account));
      },
    }),
    deleteOne: ({ _id }) => {
      const deletedCount = budgets.filter(b => b._id === _id).length;
      budgets = budgets.filter(b => b._id !== _id);
      return Promise.resolve({
        deletedCount,
      });
    },
    findOne: ({ _id }) => {
      if (_id) { return Promise.resolve(budgets.find(t => t._id === _id)); }
      return budgets[0];
    },
    insertOne: (budget) => {
      budgets.push({ _id: '50', ...budget });
      return Promise.resolve({ insertedId: '50' });
    },
    updateOne: ({ _id }, { $set }) => {
      const idx = budgets.find(b => b._id === _id);
      if (idx) {
        budgets[idx] = { ...budgets[idx], ...$set.modificator };
      }
      return Promise.resolve();
    },
  },
};


mongodb.connection = {
  db: () => ({
    collection: name => mockCollections[name],
  }),
  withSession: callback => callback(mockSession),
};

module.exports = mongodb;
