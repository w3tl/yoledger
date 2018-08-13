jest.mock('mongodb');
import dataloaders from '../dataloaders';

describe('dataloaders', () => {
  const { connection } = require('mongodb');
  const dl = dataloaders(connection);

  test('accountByName', async () => {
    const load = await dl.accountByName.load({ name: 'Food', userId: 'admin' });
    expect(load).toMatchSnapshot('Load Food for admin');

    const loadMany = await dl.accountByName.loadMany([
      { name: 'Food', userId: 'admin' },
      { name: 'Train', userId: 'admin' },
    ]);
    expect(loadMany).toMatchSnapshot('Load Food and Train for admin');
  });
});
