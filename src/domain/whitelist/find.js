const { Whitelist } = require('../../infra/database/models')

async function find({ address }) {
    const result = await Whitelist.findOne({ invokerAddress: address });
    return result;
}

module.exports = find;