# Canon
A Hyperledger Indy replacement using Ethereum


Steps
Check to verify if nodejs is installed
Open terminal
Create a new folder and give it a name
git clone https://github.com/VeriDID/Canon.git
cd to canon
npm init
npm install --save-dev hardhat
npx hardhat
choose create an empty hardhat.config.js
NOTE: Since the entry point is index.js Hardhat.config.js will be changed later to index.js
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install web3 web3-eea fs solc
change hardhat.config.js to index.js
create a new folders and give it a names
a. private_tx.js
b. compile_deploy_eth_sendTransaction.js
c. compile_deploy_web3_eth_sendTransaction.js
d. compile_deploy_web3_quorum_priv_generate.js
e. compile_deploy_web3eea_eaasendraw.js
f. configure .env
g. npm install dotenv
specify the path to the for --genesis file
example: besu --data-path=/path/to/data-dir --genesis-file=/path/to/genesis.json
npm install besu
To run the script 
node start-private-network.js







# PRIVATE_NETWORKS
