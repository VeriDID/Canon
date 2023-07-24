const { Besu } = require('besu');
const path = require('path');

async function main() {
  const dataPath = path.resolve(__dirname, 'private-network-data'); // Change this to the desired data directory path
  const genesisFile = path.resolve(__dirname, 'genesis.json'); // Change this to the path of your modified genesis.json file

  const besu = new Besu({
    dataPath,
    genesis: genesisFile,
  });

  try {
    console.log('Starting private Ethereum network...');
    await besu.start();

    // The private network is now running, you can interact with it as needed.

  } catch (error) {
    console.error('Error starting private network:', error);
  }
}

main();
