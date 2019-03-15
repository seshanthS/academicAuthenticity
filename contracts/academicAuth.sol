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
 
  event certificateApproved(uint indexed _serialNo, bytes _signature, address signedBy);
  
  
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
  
  function addSigner(address _signer)public onlyApprover{
    signerId++;
    signer[signerId] = _signer;
  }

  function modifySigner(uint _signerId, address _newSignerId)public onlyApprover{
    signer[_signerId] = _newSignerId;
  }

  //assign 0 address to remove the signer
  function removeSigner(uint _signerId) public onlyApprover {
    signer[_signerId] = address(0);
  }
  
  //Broadcasts the certificate to the network.
  function broadcast(uint _serialNo, bytes memory certificate, uint _signerId)public
  onlySigners(_signerId){
    //must be a valid signer
    require(signer[_signerId] != address(0), "Not a signer anymore");
    emit certificateApproved(_serialNo, certificate, msg.sender);
  } 
}