import Model from '../Model';
import schema from './schema';

export default class Budget extends Model {
  constructor(db, userId) {
    super(db, userId);
    this.collName = 'budget';
    this.schema = schema;
  }

  async upsertBudget({ account, date, amount }) {
    const periodDate = typeof date === 'string'
      ? new Date(date) : date;
    const { upsertedId } = await super.updateOne({
      date: periodDate, account,
    }, {
      $set: { amount },
    }, {
      upsert: true,
    });
    return upsertedId;
  }

  /**
   * Returns an array with the `count` of dates
   *
   * @param {Date} dateStart The date of the beginning
   * @param {Number} count Number of periods
   * @param {Object} params Rules for the formation of periods
   * @return {Array} Dates, starting with `dateStart`
   */
  static periods(dateStart, count, {
    type, options,
  }) {
    switch (type) {
      case 'dayOfMonth': {
        const periods = [];
        const currentDate = new Date(dateStart);
        // прибавляется длина на случай если день в dateStart позже чем день в options
        for (let i = 0; i < count / options.length + options.length; i += 1) {
          const daysOfMonth = options.map((day) => {
            const date = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), day));
            return date;
          });
          periods.push(...daysOfMonth);
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
        // находим дату >= dateStart
        const startIdx = periods.findIndex(date => date.getTime() >= dateStart);
        return periods.slice(startIdx, startIdx + count);
      }
      default:
        return [];
    }
  }
}
