const { ozDefender } = require('../../domain');

async function registerMember(req, res) {
  const { invokerAddress, contractAddress } = req;
  const data = await ozDefender.registerMember({ invokerAddress, contractAddress });
  res.json(data);
}

module.exports = [registerMember];
