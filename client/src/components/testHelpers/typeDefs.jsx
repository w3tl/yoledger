export default `
scalar Date
type Query {
  account(id: ID!): Account
  accounts(type: AccountType!): [Account]

  budgets(dateStart: Date!, count: Int = 5): Budget
  budget(date: Date!): [Allocation]

  transactions(dateStart: Date!, dateEnd: Date, page: Int = 0, itemsPerPage: Int = 20): [Transaction]
  transaction(id: ID!): Transaction
}
type Mutation {
  addAccount(input: AddAccountInput!): AddAccountPayload
  upsertBudget(input: UpsertBudgetInput!): UpsertBudgetPayload
  addTransaction(input: AddTransactionInput!): AddTransactionPayload
  deleteTransaction(id: ID!): DeleteTransactionPayload
  updateTransaction(id: ID!, input: UpdateTransactionInput!): UpdateTransactionPayload
}

type Account {
  id: ID!
  name: String!
  balance: Float
  type: AccountType!
}

type Budget {
  periods: [Date]
  accounts: [Account]
}

type Allocation {
  id: String!
  account: Account!
  amount: Float
  balance: Float
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
  allocation: Allocation
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
`;
