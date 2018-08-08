export default {
  type: 'object',
  required: ['date', 'userId'],
  additionalProperties: false,
  properties: {
    _id: {
      bsonType: 'objectId',
    },
    date: {
      bsonType: 'date',
    },
    account: {
      type: 'string',
    },
    amount: {
      type: 'number',
    },
    balance: {
      type: 'number',
    },
    userId: {
      type: 'string',
    },
  },
};
