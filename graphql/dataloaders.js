import DataLoader from 'dataloader';
import { Account } from '../model';

const getAccountByName = connection => ids => new Promise((resolve, reject) => {
  const promises = ids.map(
    ({ name, userId }) => {
      const account = new Account(connection.db(), userId);
      return account.findByName(name);
    },
  );
  Promise.all(promises)
    .then(docs => resolve(docs))
    .catch(err => reject(err));
});

export default connection => ({
  accountByName: new DataLoader(getAccountByName(connection)),
});
