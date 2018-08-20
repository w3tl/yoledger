export default `
scalar Date
type Query {
  account(id: ID!): Account
  accounts(type: AccountType!): [Account]

  budgets(dateStart: Date!, count: Int = 5): Budget
  budget(date: Date!): [Allocation]
}
type Mutation {
  addAccount(input: AddAccountInput!): AddAccountPayload
  upsertBudget(input: UpsertBudgetInput!): UpsertBudgetPayload
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
`;
