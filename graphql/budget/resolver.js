import { Budget as Budgets } from '../../model';

export const Budget = {
  id: ({ _id }) => _id,
  account: ({ account }, _, { dataloaders, userId }) => dataloaders
    .accountByName.load({ name: account, userId }),
};

export const Query = {
  async budget(root, { dateStart, dateEnd, account }, { userId, connection }) {
    const budget = new Budgets(connection.db(), userId);
    const query = {
      $and: [{
        date: { $gte: dateStart },
      }, {
        date: { $lte: dateEnd },
      }],
    };
    if (account) { query.account = account; }

    return budget.find(query).toArray();
  },
};

export const Mutation = {
  async addBudget(root, { input }, { userId, connection }) {
    const { account, date, amount } = input;
    const budget = new Budgets(connection.db(), userId);
    const insertedId = await budget.addBudget({ account, date, amount });

    return {
      budget: await budget.findOne({ _id: insertedId }),
    };
  },
  async updateBudget(root, { id, input: { amount } }, { userId, connection }) {
    const budget = new Budgets(connection.db(), userId);
    await budget.updateBudget(id, { amount });
    return {
      budget: await budget.findOne({ _id: id }),
    };
  },
  async deleteBudget(root, { id }, { userId, connection }) {
    const budget = new Budgets(connection.db(), userId);
    const { deletedCount } = await budget.deleteOne({ _id: id });

    return { success: deletedCount === 1 };
  },
};
