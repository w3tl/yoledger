export const User = {
  username: ({ _id }) => _id,
};

export const Query = {
  user(root, _, { models: { userModel } }) {
    return userModel.findOne();
  },
};
