import { User as Model } from '../../model';

export const User = {
  username: ({ _id }) => _id,
};

export const Query = {
  user(root, _, { userId, connection }) {
    const user = new Model(connection.db(), userId);
    return user.findOne();
  },
};
