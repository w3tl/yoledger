export default `
scalar Date
type Query {
  account(id: ID!): Account
  accounts(type: AccountType!): [Account]

  budgets(dateStart: Date!, dateEnd: Date!): Budgets
  budget(account: String!, dateStart: Date!, dateEnd: Date!): [Budget]

  transactions(dateStart: Date!, dateEnd: Date, page: Int = 0, itemsPerPage: Int = 20): [Transaction]
  transaction(id: ID!): Transaction
}
type Mutation {
  addAccount(input: AddAccountInput!): AddAccountPayload
  upsertBudget(input: UpsertBudgetInput!): UpsertBudgetPayload
  addTransaction(input: AddTransactionInput!): AddTransactionPayload
  deleteTransaction(id: ID!): DeleteTransactionPayload
  updateTransaction(id: ID!, input: UpdateTransactionInput!): UpdateTransactionPayload
  signin(login: String!, password: String!): SignupPayload!
  signout(token: String): SignoutPayload!
  changePassword(oldPassword: String!, newPassword: String!): ChangePasswordPayload!
}

type Account {
  id: ID!
  name: String!
  balance: Float
  type: AccountType!
}

type Budgets {
  periods: [Date]
  accounts: [Account]
}

type Budget {
  id: ID!
  date: Date!
  account: Account
  amount: Float!
}

enum AccountType {
  ASSET
  EXPENSE
  INCOME
  VENDOR
}

input AddAccountInput {
  name: String!
  balance: Float
  type: AccountType!
}

type AddAccountPayload {
  account: Account
}

input UpsertBudgetInput {
  account: String!
  date: Date!
  amount: Float!
}

type UpsertBudgetPayload {
  success: Boolean
  budget: Budget
}

type Transaction {
  id: ID!
  amount: Float!
  source: Account!
  destination: Account!
  date: Date!
}
input AddTransactionInput {
  source: String!
  destination: String!
  amount: Float!
  date: Date
}
type AddTransactionPayload {
  transaction: Transaction
}
type DeleteTransactionPayload {
  success: Boolean!
  id: ID
}
input UpdateTransactionInput {
  amount: Float
  source: String
  destination: String
  date: Date
}
type UpdateTransactionPayload {
  transaction: Transaction
}

type SignupPayload {
  token: String!
}
type SignoutPayload {
  success: Boolean
}
type ChangePasswordPayload {
  token: String
}
`;
