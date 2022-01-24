# myDeFi Solidity -  web3 React DAPP


### to install the app:

-truffle installed globally
npm install -g truffle

-install the project dependency
npm i

### to run the app:

-ganache installed and running

(if the contracts are not already deployed)
run truffle migration

-metamask installed in the browser

-add ganache network to metamask

-add one ganache account to metamask

-run the seed scripts to load data in the ganache blockchain 
truffle exec scripts/seed-exchange.js
### to run the test:

-use different ganache network to run the test

-ganache installed and running

run truffle test


### deploy smart contract

-create infura node

-deployed in rinkeby

-rinkeby faucet https://faucets.chain.link/rinkeby

-truffle deploy command:

truffle migrate --network rinkeby

(error deploying force with this command)
truffle migrate --network rinkeby -skipDryRun

### deploy DAPP

-deploy with heroku

-install heroku CLI

-add heroku remote to the project

-git push heroku 

(problems)
-check logs in heroku: 
heroku logs --tails

(memory issues in heroku)
heroku config:set NODE_OPTIONS="--max_old_space_size=2560" -a [app_name]
