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
        const dateStartDate = new Date(dateStart);
        let startDay = dateStartDate.getDate();
        let month = dateStartDate.getMonth();
        let year = dateStartDate.getFullYear();
        if (startDay < options[0]) { // предыдущий месяц
          startDay = options[options.length - 1];
          // если месяц первый - берем последний месяц года
          month = month === 0 ? 11 : month - 1;
          // если месяц последний - уменьшаем год
          year = month === 11 ? year - 1 : year;
        } else if (startDay > options[options.length - 1]) { // следующий месяц
          [startDay] = options;
          // если месяц последний - берем первый
          month = month === 11 ? 0 : month + 1;
          // если месяц первый - увеличиваем год
          year = month === 0 ? year + 1 : year;
        } else {
          startDay = options.slice().reverse().find(day => startDay >= day);
        }
        const startDate = new Date(Date.UTC(year, month, startDay));
        const currentDate = new Date(Date.UTC(year, month, startDay));

        const periods = [];
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
        const startIdx = periods.findIndex(date => date.getTime() >= startDate.getTime());
        // console.log(dateStart, startDate.toISOString());
        // console.log(periods, startIdx);
        return periods.slice(startIdx, startIdx + count);
      }
      default:
        return [];
    }
  }
}
