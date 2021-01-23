const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

const pair = StellarSdk.Keypair.random();

const friendBot = 'https://friendbot.stellar.org?addr=';
const testnet = 'https://horizon-testnet.stellar.org';
const publicKey = encodeURIComponent(pair.publicKey());

(async function main() {
  try {
    const response = await fetch(`${friendBot}${publicKey}`);
    const responseJSON = await response.json();
    console.log(`SUCCESS! Created a new account\n${responseJSON.id}\n`);
    console.log(`With fields: \n\n${Object.keys(responseJSON).join(',\n')}\n\n`);
  } catch (e) {
    console.error("ERROR!", e);
  }
  const server = new StellarSdk.Server(testnet);
  
  const account = await server.loadAccount(pair.publicKey());
  console.log(`Balance for account: ${pair.publicKey()}`);
  account.balances.forEach(trustline => {
    const {asset_type, balance} = trustline;
    console.log(`\n  Type: ${asset_type} - Balance: ${balance}`);
  })
})();
