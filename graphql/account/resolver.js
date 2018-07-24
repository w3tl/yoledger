import { Account as Accounts } from '../../model';

export const Account = {
  id: ({ _id }) => _id,
};

export const Query = {
  async accounts(root, { type }, { userId, connection }) {
    const account = new Accounts(connection.db(), userId);

    return account.find({ type }).toArray();
  },
};

export const Mutation = {
  async addAccount(root, { input }, { userId, connection }) {
    const { name, type, balance } = input;
    const account = new Accounts(connection.db(), userId);
    const { insertedId } = await account.create({
      name,
      balance,
      type,
    });

    return {
      account: await account.findOne({ _id: insertedId }),
    };
  },
};
