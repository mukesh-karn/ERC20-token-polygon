require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();
// require("@nomiclabs/hardhat-ethers");
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.20",
// };

/**
* @type import('hardhat/config').HardhatUserConfig
*/


const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    // hardhat: {},
    // volta: {
    //   url: API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`],
    //   gas: 210000000,
    //   gasPrice: 800000000000,
    // }
    hardhat: {
    },
    // polygon: {
    //   networkId: 137,
    //   url: `https://polygon-rpc.com`,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    mumbai: {
      networkId: 80001,
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [`${PRIVATE_KEY}`]
    }
  },
}