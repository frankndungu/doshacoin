import { Blockchain, Transactions } from './blockchain.js'

let doshaCoin = new Blockchain();
doshaCoin.createTransactions(new Transactions("address1", "address2", 100));
doshaCoin.createTransactions(new Transactions("address2", "address1", 50));

console.log("\n Starting the miner ");
doshaCoin.minePendingTransactions("franks-address");

console.log(
  "\nBalance of frank is ",
  doshaCoin.getBalanceOfAddress("franks-address")
);

console.log("\n Starting the miner again ...");
doshaCoin.minePendingTransactions("franks-address");

console.log(
  "\nBalance of frank is ",
  doshaCoin.getBalanceOfAddress("franks-address")
);
