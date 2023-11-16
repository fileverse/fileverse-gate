const { Heart } = require("../../infra/database/models");
const axios = require("axios");
const config = require("../../../config");
const { RegistryContract } = require("../contract");

const registryContractInstance = new RegistryContract();

async function mintHeart({ invokerAddress, amount, urlString, chainId }) {
  const heartTokenContractAddress = config.HEART_MINT_CONTRACT;
  // get the tokenId of the contract in the registry
  const tokenId = await registryContractInstance.getTokenId(
    heartTokenContractAddress
  );
  const apiResponse = await axios.post(
    config.MINT_HEART_WEB_HOOK,
    {
      address: invokerAddress,
      tokenId: tokenId,
      amount: amount,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const exitingItem = await Heart.findOne({
    ownerAddress: invokerAddress,
    tokenId,
    urlString,
    chainId,
  });
  if (!exitingItem) {
    await new Heart({
      invokerAddress,
      chainId,
      tokenId,
      urlString,
    }).save();
  }
  return apiResponse.data;
}

module.exports = mintHeart;
