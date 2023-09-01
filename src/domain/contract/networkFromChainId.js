function networkFromChainId(chainId) {
  if (!chainId) {
    return 'eth_goerli';
  }
  const chainIdInNumber = Number(chainId);
  switch (chainIdInNumber) {
    case 5:
      return 'eth_goerli';
    case 8420:
      return 'fileverse_testnet';
    case 1:
      return 'eth_mainnet';
    case 137:
      return 'polygon_mainnet';
    case 100:
      return 'gnosis_mainnet';
    case 1313161554:
      return 'aurora';
    case 10200:
      return 'gnosis_testnet';
    case 534351:
      return 'eth_scroll_sepolia';
    default:
      return 'eth_goerli';
  }
}

module.exports = networkFromChainId;
