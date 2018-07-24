import { Account, Transaction, Budget } from '../model';
import accounts from '../mocks/accounts';
import transactions from '../mocks/transactions';

export default async function fillDB(client) {
  const db = client.db();

  const Accounts = new Account(db, 'admin');
  await Accounts.clear();
  const promises = accounts.map(Accounts.create.bind(Accounts));
  await Promise.all(promises);

  const Transactions = new Transaction(db, 'admin');
  await Transactions.clear();

  await Promise.all(
    transactions.map(
      trans => client.withSession(s => Transactions.post(trans, s)),
    ),
  );

  await client.close();
}
