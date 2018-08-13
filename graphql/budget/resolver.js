import { Budget as Budgets } from '../../model';

export const BudgetPlan = {
  async budget({ periods, accounts }, _, { models: { budgetModel } }) {
    const notFullAllocations = await budgetModel.aggregate([
      { $match: { date: { $in: periods }, account: { $in: accounts } } },
      {
        $group: {
          _id: { date: '$date' },
          allocations: {
            $push: { account: '$account', amount: '$amount', balance: '$balance' },
          },
        },
      },
    ]).toArray();

    const notFullBudget = periods.map((date) => {
      const budget = notFullAllocations
        .find(({ _id }) => _id.date.getTime() === date.getTime()) || {};
      return { _id: { date }, allocations: budget.allocations || [] };
    });

    const budget = notFullBudget.map(({ allocations, _id: { date } }) => ({
      date,
      allocations: accounts.map((account) => {
        const allocation = allocations.find(a => a.account === account.name);
        if (allocation) {
          return { ...allocation, ...{ account } };
        }
        return { account, amount: 0, balance: 0 };
      }),
    }));

    return budget;
  },
};

export const Query = {
  async budgets(root, { dateStart, count }, { models: { budgetModel } }) {
    if (count > 20) throw new Error('Count too long');
    const periods = Budgets.periods(dateStart, count, {
      type: 'dayOfMonth', options: [10, 25],
    });

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

    return { periods, accounts };
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
