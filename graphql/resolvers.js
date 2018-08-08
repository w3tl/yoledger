import {
  Query as UserQuery,
  User,
} from './user';
import {
  Query as AccountQuery,
  Mutation as AccountMutation,
  Account,
} from './account';
import {
  Query as TransactionQuery,
  Mutation as TransactionMutation,
  Transaction,
} from './transaction';
import {
  Query as BudgetQuery,
  Mutation as BudgetMutation,
  Budget,
  BudgetPlan,
} from './budget';
import dateResolver from './date';

export default {
  Query: Object.assign({}, UserQuery, AccountQuery, TransactionQuery, BudgetQuery),
  Mutation: Object.assign({}, AccountMutation, TransactionMutation, BudgetMutation),
  User,
  Account,
  Transaction,
  Budget,
  BudgetPlan,
  Date: dateResolver,
};
