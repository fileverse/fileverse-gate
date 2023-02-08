const PortalContract = require('./portalContract');
const RegistryContract = require('./registryContract');
const MemberContract = require('./memberContract');
const ERC1155Contract = require('./erc1155Contract');
const ERC721Contract = require('./erc721Contract');
const ERC20Contract = require('./erc20Contract');
const networkFromChainId = require('./networkFromChainId');
const getStatus = require('./getStatus');
const getMembers = require('./getMembers');

module.exports = {
    PortalContract,
    RegistryContract,
    MemberContract,
    ERC1155Contract,
    ERC721Contract,
    ERC20Contract,
    networkFromChainId,
    getStatus,
    getMembers,
};
