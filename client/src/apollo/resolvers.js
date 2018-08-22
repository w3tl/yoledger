export const defaults = {
  settings: {
    __typename: 'AppSettings',
    transaction: {
      __typename: 'TransactionSettings',
      period: 'DAY',
      date: new Date().toISOString(),
    },
  },
};

export function getDateStart(period, date) {
  if (period === 'DAY') return date;
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(date.setDate(diff));
}

export const Mutation = {
  changeTransactionPagePeriod(_, { period, date }, { cache }) {
    const dateStart = getDateStart(period, new Date(date)).toISOString();
    cache.writeData({
      data: {
        settings: {
          __typename: 'AppSettings',
          transaction: {
            __typename: 'TransactionSettings',
            period,
            date: dateStart,
          },
        },
      },
    });

    return { __typename: 'TransactionSettings', period, date: dateStart };
  },
};
