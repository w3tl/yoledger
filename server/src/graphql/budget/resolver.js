import { Buffer } from 'buffer';
import { Budget as Budgets } from '../../model';

const genId = ({ date, account }) => Buffer.from(
  date.toISOString().concat(account.name),
).toString('base64');

export const Budget = {
  async accounts({ periods }, _, { models: { budgetModel } }) {
    const accounts = await budgetModel.aggregate([
      { $match: { date: { $in: periods } } },
      {
        $group: {
          _id: { account: '$account' },
        },
      },
      {
        $project: {
          account: '$_id.account',
        },
      },
      {
        $replaceRoot: { newRoot: '$account' },
      },
    ]).toArray();
    return accounts;
  },
};

export const Query = {
  async budgets(root, { dateStart, count }) {
    if (count > 20) throw new Error('Count too long');
    const periods = Budgets.periods(dateStart, count, {
      type: 'dayOfMonth', options: [10, 25],
    });
    return { periods };
  },
  async budget(root, { date }, { models: { budgetModel } }) {
    const budget = await budgetModel.find({ date: new Date(date) }).toArray();
    return budget.map(({ account, ...other }) => ({
      id: genId({ date, account }),
      account,
      ...other,
    }));
  },
};

export const Mutation = {
  async upsertBudget(root, { input }, { models: { budgetModel }, dataloaders, userId }) {
    const { account, date, amount } = input;
    const ok = await budgetModel.upsertBudget({ account, date, amount });
    const accountObj = await dataloaders.accountByName.load({ name: account, userId });
    return {
      success: ok,
      allocation: {
        id: genId({ date, account: accountObj }),
        amount,
        account: accountObj,
      },
    };
  },
};
