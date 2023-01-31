const { contract } = require('../../domain');

async function getStatus(req, res) {
  const { invokerAddress, contractAddress, chainId } = req;
  const data = await contract.getStatus({ invokerAddress, contractAddress, chainId });
  res.json(data);
}

module.exports = [getStatus];
