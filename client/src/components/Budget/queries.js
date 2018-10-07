import gql from 'graphql-tag';

export const BODY_QUERY = gql`
query BudgetPeriodsQuery($dateStart: Date!, $dateEnd: Date!) {
  budgets(dateStart: $dateStart, dateEnd: $dateEnd) {
    accounts {
      name
    }
  }
}
`;

export const ROW_QUERY = gql`
query BudgetQuery($account: String!, $dateStart: Date!, $dateEnd: Date!) {
  budget(account: $account, dateStart: $dateStart, dateEnd: $dateEnd) {
    id
    date
    amount
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation upsertBudget($input: UpsertBudgetInput!) {
  upsertBudget(input: $input) {
    success
    budget {
      id
      account {
        id
        name
      }
      date
      amount
    }
  }
}
`;
