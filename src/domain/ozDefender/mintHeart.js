const axios = require("axios");
const config = require("../../../config");

async function mintHeart({ invokerAddress, urlString, startBlock, rawUrl }) {
  // remove console.log after testing
  console.log({ invokerAddress, urlString, startBlock, rawUrl });
  const apiResponse = await axios.post(
    config.MINT_HEART_WEB_HOOK,
    {
      address: invokerAddress,
      urlString,
      startBlock,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return apiResponse.data;
}

module.exports = mintHeart;
