jest.mock('crypto');
jest.mock('argon2');

const RealDate = Date;
function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor() {
      super();
      return new RealDate(isoDate);
    }
  };
}

describe('auth', () => {
  beforeAll(() => {
    mockDate('2018-06-20');
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  test('createCredentials', async () => {
    const { createCredentials } = require('./auth');
    const result = await createCredentials({ password: 'password' });
    expect(result).toMatchSnapshot();
  });
});
