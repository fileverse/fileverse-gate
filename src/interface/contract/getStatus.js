const { contract } = require('../../domain');

async function getStatus(req, res) {
  const { invokerAddress, contractAddress } = req;
  const data = await contract.getStatus({ invokerAddress, contractAddress });
  res.json(data);
}

module.exports = [getStatus];
