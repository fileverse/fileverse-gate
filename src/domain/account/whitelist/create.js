const { Whitelist } = require('./../../../infra/database/models');

async function create({ address, tag }) {
  if (!tag) {
    tag = 'personal_invite';
  }
  const createdWhitelist = await Whitelist.updateOne(
    { invokerAddress: address.toLowerCase() },
    {
      $set: {
        tag,
      },
    },
    { upsert: true },
  );
  return createdWhitelist.acknowledged;
}

module.exports = create;
