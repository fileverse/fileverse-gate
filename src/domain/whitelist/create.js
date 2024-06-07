const { Whitelist } = require('../../infra/database/models')

async function create({ address, tag, author }) {
    tag = tag ? tag : 'personal-invite'
    bulkData = address.map((addr) => {
        return { invokerAddress: addr, tag: tag, author: author }
    })

    await Whitelist.insertMany(bulkData)
}

module.exports = create;