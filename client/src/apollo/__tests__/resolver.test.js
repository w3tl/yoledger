import { getDateStart, Mutation } from '../resolvers';

describe('resolver', () => {
  it('getDateStart should return correct date for any period', () => {
    const dateForDay = getDateStart('DAY', new Date('2018-01-01'));
    expect(dateForDay.toISOString()).toMatchSnapshot('DAY');
    const dateForWeek = getDateStart('WEEK', new Date('2018-01-01'));
    expect(dateForWeek.toISOString()).toMatchSnapshot('start WEEK in 2018-01-01');
    const dateForWeek2 = getDateStart('WEEK', new Date('2018-01-11'));
    expect(dateForWeek2.toISOString()).toMatchSnapshot('start WEEK in 2018-01-11');
    const dateForWeek3 = getDateStart('WEEK', new Date('2018-06-13'));
    expect(dateForWeek3.toISOString()).toMatchSnapshot('start WEEK in 2018-06-13');
  });

  describe('Mutation changeTransactionPagePeriod', () => {
    const date = '2018-01-01';
    const cache = {
      writeData: jest.fn(),
    };
    it('should write to cache and return', () => {
      const result = Mutation.changeTransactionPagePeriod(null, { period: 'WEEK', date }, { cache });
      expect(cache.writeData.mock.calls[0]).toMatchSnapshot('writeData');
      expect(result).toMatchSnapshot('WEEK 2018-01-01');
    });
  });
});
