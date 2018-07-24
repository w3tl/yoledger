import Model from '../Model';
import Account from '../accounts';

const schema = {
  type: 'object',
  required: ['account', 'date', 'amount', 'userId'],
  additionalProperties: false,
  properties: {
    _id: {
      bsonType: 'objectId',
    },
    account: {
      type: 'string',
    },
    date: {
      bsonType: 'date',
    },
    amount: {
      type: 'number',
    },
    userId: {
      type: 'string',
    },
  },
};


export default class Budget extends Model {
  constructor(db, userId) {
    super(db, userId);
    this.collName = 'budget';
    this.schema = schema;
  }

  async checkAccount(account) {
    const accountModel = new Account(this.db, this.userId);
    const accountDoc = await accountModel.findByName(account);
    if (!accountDoc) {
      throw new Error('Account not found');
    }
  }

  async addBudget({ account, date, amount }) {
    await this.checkAccount(account);
    const { insertedId } = await super.insertOne({
      date: new Date(date),
      account,
      amount,
    });
    return insertedId;
  }

  async updateBudget(_id, {
    date, account, amount,
  }) {
    const modificator = {};
    if (date) { modificator.date = date; }
    if (account) {
      await this.checkAccount(account);
      modificator.account = account;
    }
    if (amount) { modificator.amount = amount; }

    return super.updateOne({ _id }, { $set: modificator });
  }
}
