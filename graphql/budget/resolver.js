import { Budget as Budgets } from '../../model';

export const Budget = {
  account: ({ _id }, _, { dataloaders, userId }) => dataloaders
    .accountByName.load({ name: _id.account, userId }),
};

export const BudgetPlan = {
  async accounts({ periods }, _, { models: { budgetModel } }) {
    const notFullAllocation = await budgetModel.aggregate([
      { $match: { date: { $in: periods } } },
      {
        $group: {
          _id: { account: '$account' },
          allocations: {
            $push: { date: '$date', amount: '$amount', balance: '$balance' },
          },
        },
      },
    ]).toArray();
    const accounts = notFullAllocation.map(({ allocations, ...other }) => ({
      ...other,
      allocations: periods.map((date) => {
        const allocation = allocations.find(a => a.date.getTime() === date.getTime());
        return allocation || { date, amount: 0, balance: 0 };
      }),
    }));
    return accounts;
  },
};

export const Query = {
  budgets(root, { dateStart, count }) {
    if (count > 10) throw new Error('Count too long');
    const periods = Budgets.periods(dateStart, count, {
      type: 'dayOfMonth', options: [10, 25],
    });
    return {
      periods,
    };
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
