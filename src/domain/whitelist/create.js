const { Whitelist } = require('../../infra/database/models')

async function create({ address, tag }) {
    tag = tag ? tag : 'personal-invite'
    bulkData = address.map((addr) => {
        return { invokerAddress: addr, tag: tag }
    })

    await Whitelist.insertMany(bulkData)
}

module.exports = create;