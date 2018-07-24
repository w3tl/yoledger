import { GraphQLError } from 'graphql';
import { Transaction as Model } from '../../model';

export const Transaction = {
  id: ({ _id }) => _id,
  date: ({ createdAt }) => createdAt,
  source({ source }, _, { dataloaders, userId }) {
    return dataloaders.accountByName.load({ name: source.name, userId });
  },
  destination({ destination }, _, { dataloaders, userId }) {
    return dataloaders.accountByName.load({ name: destination.name, userId });
  },
};

export const Mutation = {
  async addTransaction(root, { input }, { userId, connection }) {
    const {
      source, destination, amount, date: createdAt,
    } = input;
    const transObj = {
      source,
      destination,
      amount,
      createdAt,
    };

    const trans = new Model(connection.db(), userId);
    let _id;
    await connection.withSession(async (session) => {
      _id = await trans.post(transObj, session);
    });

    const transaction = await trans.findOne({ _id });

    return {
      transaction,
    };
  },
  async deleteTransaction(root, { id }, { userId, connection }) {
    const trans = new Model(connection.db(), userId);
    try {
      await connection.withSession(session => trans.unpost(id, session));
    } catch (err) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  },
  async updateTransaction(root, { id, input }, { userId, connection }) {
    const trans = new Model(connection.db(), userId);
    const {
      amount, source, destination, date: createdAt,
    } = input;
    const updates = {
      source,
      destination,
      amount,
      createdAt,
    };
    try {
      let updatedId;
      await connection.withSession(async (session) => {
        updatedId = await trans.update(id, updates, session);
      });
      const transaction = await trans.findOne({ _id: updatedId });
      return { transaction };
    } catch (err) {
      throw new GraphQLError(err.message);
    }
  },
};

export const Query = {
  /* eslint-disable-next-line object-curly-newline */
  async transactions(_, { dateStart, dateEnd, page, itemsPerPage }, { userId, connection }) {
    const trans = new Model(connection.db(), userId);
    const query = {};
    if (dateEnd) {
      query.$and = [
        { createdAt: { $gte: dateStart } },
        { createdAt: { $lte: dateEnd } },
      ];
    } else {
      query.createdAt = { $gte: dateStart };
    }

    return trans.find(query)
      .skip(page * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();
  },
};
