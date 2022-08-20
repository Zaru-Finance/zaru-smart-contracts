const chai = require('chai');
const { expect } = require('chai');
const { ethers } = require('hardhat');
const BN = require('bn.js');
//Enable and inject BN dependency
chai.use(require('chai-bn')(BN));

describe('Governance Token', () => {
  let Token;
  let token;
  let deployer;
  let addr1;

  beforeEach(async () => {
    [deployer, addr1] = await ethers.getSigners();
    Token = await ethers.getContractFactory('GovernanceToken');
    token = await Token.deploy(
      deployer.address
    );
  });

  describe('Deployment', () => {
    it('Should set the right total supply', async () => {
      expect((await token.totalSupply()).toString()).to.equal(
        '10000000000000000000000000'
      );
    });
    it('Should send all tokens to deployer address', async () => {
      const balance = await token.balanceOf(deployer.address);
      expect(balance.toString()).to.equal('10000000000000000000000000');
    });

  });
});