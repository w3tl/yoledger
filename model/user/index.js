import Model from '../Model';
import schema from './schema';
import { createCredentials } from './auth';

export default class User extends Model {
  constructor(db, userId) {
    super(db, userId.toLowerCase());
    this.schema = schema;
    this.collName = 'users';
  }

  async create({ password }) {
    if (await this.findOne({ _id: this.userId })) {
      throw new Error('User exist');
    }

    const credentials = await createCredentials({ password });

    const user = {
      _id: this.userId,
      credentials: {
        current: credentials,
      },
      createdAt: new Date(),
    };

    await super.insertOne(user);
    return this.findOne();
  }

  findOne(...props) {
    return super.findOne({ _id: this.userId }, ...props);
  }
}
