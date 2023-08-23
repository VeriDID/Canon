import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const APOTHEM_NETWORK_URL = process.env.APOTHEM_NETWORK_URL;
const APOTHEM_PRIVATE_KEY = process.env.APOTHEM_PRIVATE_KEY;
const GAS_LIMIT = "4000000";  // default value, adjust if needed
const GAS_PRICE = "20000000000";  // default to 20 Gwei, adjust if neede

if (!APOTHEM_NETWORK_URL || !APOTHEM_PRIVATE_KEY) {
  console.error('Please set the APOTHEM_NETWORK_URL and APOTHEM_PRIVATE_KEY in your .env file');
  process.exit(1);
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    apothem: {
      url: APOTHEM_NETWORK_URL,
      accounts: [APOTHEM_PRIVATE_KEY],
      gas: parseInt(GAS_LIMIT),
      gasPrice: parseInt(GAS_PRICE)
    }
  }
};

export default config;
