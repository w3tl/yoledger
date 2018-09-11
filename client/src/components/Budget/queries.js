import gql from 'graphql-tag';

export const BODY_QUERY = gql`
query BudgetPeriodsQuery($dateStart: Date!, $count: Int) {
  budgets(dateStart: $dateStart, count: $count) {
    periods
    accounts {
      name
    }
  }
}
`;

export const COLUMN_QUERY = gql`
query BudgetQuery($date: Date!) {
  budget(date: $date) {
    id
    account {
      name
    }
    amount
  }
}
`;

export const UPDATE_MUTATION = gql`
mutation upsertBudget($input: UpsertBudgetInput!) {
  upsertBudget(input: $input) {
    success
    allocation {
      id
      account { id name }
      amount
    }
  }
}
`;
