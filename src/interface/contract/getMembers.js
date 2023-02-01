const { contract } = require('../../domain');

async function getMembers(req, res) {
  const { invokerAddress, contractAddress, chainId } = req;
  const data = await contract.getMembers({ invokerAddress, contractAddress, chainId });
  res.json(data);
}

module.exports = [getMembers];
