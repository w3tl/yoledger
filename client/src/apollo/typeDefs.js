export default `
  type AppSettings {
    transaction: TransactionSettings
  }
  type TransactionSettings {
    date: String
    period: Period
  }
  enum Period {
    DAY
    WEEK
  }
  extend type Query {
    settings: AppSettings
  }
  extend type Mutation {
    changeTransactionPagePeriod(period: Period, date: String): TransactionSettings
  }
`;
