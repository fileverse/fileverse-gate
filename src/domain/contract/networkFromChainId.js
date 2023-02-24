function networkFromChainId(chainId) {
  if (!chainId) {
    return 'eth_goerli';
  }
  const chainIdInNumber = Number(chainId);
  if (chainIdInNumber === 5) {
    return 'eth_goerli';
  }
  if (chainIdInNumber === 8420) {
    return 'fileverse_testnet';
  }
  if (chainIdInNumber === 1) {
    return 'eth_mainnet';
  }
  if (chainIdInNumber === 137) {
    return 'polygon_mainnet';
  }
  if (chainIdInNumber === 100) {
    return 'gnosis_mainnet';
  }
  if (chainIdInNumber === 1313161554) {
    return 'aurora';
  }
  if (chainIdInNumber === 10200) {
    return 'gnosis_testnet';
  }
  return 'eth_goerli';
}

module.exports = networkFromChainId;
