pragma solidity 0.5.0;

contract cert {
 /* variables
 *   approver:
         Adress of a University. This account can add additional signers.
         For example, Consider approver as Anna University, And signers are the colleges
         affilated to anna university.
     
     signer:
         Signers will sign the certificates offchain. Only Signers can approve the certificate 
         by invoking the broadcast() function. An event certificateApproved will be emited.
 */  
  uint signerId;
  address approver;
  mapping(uint => address)signer;

  event certificateApproved(uint indexed _certificateNo, bytes _signature,uint _timestamp, address signedBy);
  event signerAdded(uint);
  event signerRemoved(uint);
  event signerModified(uint, address);
  
  constructor(address _approver)public {
    approver = _approver;
  }
  
  modifier onlySigners(uint _signerId){
    require(msg.sender == signer[_signerId], "Not a approved Signer");
    _;
  }
  
  modifier onlyApprover{
    require(msg.sender == approver, "Only approver can perform this action");
    _;
  }
  
  function addSigner(address _signer)public onlyApprover returns (uint){
    signerId++;
    signer[signerId] = _signer;
    emit signerAdded(signerId);
    return signerId;
  }

  function modifySigner(uint _signerId, address _newSignerAddress)public onlyApprover{
    signer[_signerId] = _newSignerAddress;
    emit signerModified(_signerId, signer[_signerId]);
  }

  //assign 0 address to remove the signer
  function removeSigner(uint _signerId) public onlyApprover {
    signer[_signerId] = address(0);
    emit signerRemoved(_signerId);
  }
  
  //Broadcasts the certificate to the network.
  function broadcast(uint _certificateNo, bytes memory certificate, uint _signerId)public
  onlySigners(_signerId){
    //must be a valid signer
    require(signer[_signerId] != address(0), "Not a signer anymore");
    emit certificateApproved(_certificateNo, certificate, now, msg.sender);
  } 
}