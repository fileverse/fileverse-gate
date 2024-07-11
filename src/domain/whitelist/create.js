const { Whitelist } = require('../../infra/database/models')

async function create({ addressList, tag, addedBy }) {
    tag = tag || 'personal-invite'
    const bulkData = addressList.map((addr) => {
        return { invokerAddress: addr, tag: tag, addedBy: addedBy }
    })

    await Whitelist.insertMany(bulkData)
}

module.exports = create;