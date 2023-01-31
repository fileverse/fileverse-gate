const { PortalContract } = require('../domain/contract');
const MemberCreds = require('node-cache');
const cache = new MemberCreds();

module.exports = async function member({ contractAddress, invokerAddress, chainId }) {
    const network = PortalContract.networkFromChainId(chainId);
    const cacheKey = `${contractAddress}_${invokerAddress}`.toLowerCase();
    let editDid = cache.get(cacheKey);
    if (!editDid) {
        const portalContract = new PortalContract(contractAddress, network);
        const member = await portalContract.getMember(invokerAddress);
        editDid = member.editDid;
        cache.set(cacheKey, editDid);
    }
    return editDid;
}
