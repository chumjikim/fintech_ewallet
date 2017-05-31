import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Wallets = new Mongo.Collection('wallets');
Price = new Mongo.Collection('price');
client = new CoinStack('944b961ada3e5942bbe09f24ea4a24', '510ebe8ceed5674dfa04212048ad62');
client.endpoint = "testchain.blocko.io";
client.protocol = 'http://';

privateKey = 'L2FnkYrWMt8wPWY133qFoytmAYWUDmZKHQ9g8DPPWf1oWU1nAtHh';
address = CoinStack.ECKey.deriveAddress(privateKey);
// balance = client.getBalanceSync(address);
balance = CoinStack.Math.toBitcoin(client.getBalanceSync(address));
Transactions = client.getTransactionsSync(address);

// txBuilder = client.createTransactionBuilder();
// txBuilder.addOutput('13vatygdZzNrNU3D8VCeKNBoEimzeysbZT', CoinStack.Math.toSatoshi("0.1"));
// txBuilder.setInput(address);
// tx = client.buildTransactionSync(txBuilder);
// tx.sign(privateKey);
// rawTx = tx.serialize();
//
// try {
//     // send tx
//     client.sendTransactionSync(rawTx);
// } catch (e) {
//     console.log("failed to send tx");
// }

result = client.getUnspentOutputsSync(address);


Meteor.startup(() => {
  Wallets.upsert({
    _id:address
  }, {
    $set: {
      privateKey: privateKey,
      address: address,
      balance: balance,
      Transactions: Transactions,
      result: result,
    }
  });
});

console.log(address);
console.log(balance);
console.log(Transactions);
// console.log(rawTx)
console.log('result', result);
