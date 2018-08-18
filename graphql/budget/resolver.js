import { Budget as Budgets } from '../../model';

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
        $lookup: {
          from: 'account',
          localField: '_id.account',
          foreignField: 'name',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      }, {
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
    return budgetModel.find({ date: new Date(date) }).toArray();
  },
};

export const Mutation = {
  async upsertBudget(root, { input }, { models: { budgetModel } }) {
    const { account, date, amount } = input;
    const id = await budgetModel.upsertBudget({ account, date, amount });
    return {
      success: id,
    };
  },
};

export const Allocation = {
  account({ account }, _, { dataloaders, userId }) {
    return dataloaders.accountByName.load({ name: account, userId });
  },
};
