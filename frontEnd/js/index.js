var contractAddress = "0x23c4afef9623cc762a4649aaa319b1b50aaade74";
async function signAndSubmit(){
  //var web3 = window.web3;
  checkAndInjectProvider();
  var account = await getDefaultAccount();
  var name = document.getElementById('name').value
  var certNumber = document.getElementById('certificateNumber').value
  var cgpa = document.getElementById('cgpa').value
  var certifiedTo = document.getElementById('addressOfStudent').value//"0xF8E7cFf01db79c156C6aE7e2804fbB97628f0Ef5";          
  var signerId = document.getElementById('signerId').value; 

  var data = {
    name :name,
    certNo:certNumber,
    cgpa: cgpa,
    to: certifiedTo,
    //signer: signerId
  }
  var dataToSign = JSON.stringify(data)
  window.web3.eth.personal.sign(dataToSign, await getDefaultAccount()).then((signature)=>{
    var contractInstance = new window.web3.eth.Contract(abi, contractAddress);
    
    contractInstance.methods.broadcast(certNumber, certifiedTo, signature, signerId).send({from: account})
    .on('transactionHash',(txHash)=>{
      alert("transaction Hash : " + txHash );
    });
  })
  
}

async function verify(){
  checkAndInjectProvider();
  var account = await getDefaultAccount();
  var name = document.getElementById('name').value
  var certNumber = document.getElementById('certificateNumber').value
  var cgpa = document.getElementById('cgpa').value
  var certifiedTo = document.getElementById('addressOfStudent').value//"0xF8E7cFf01db79c156C6aE7e2804fbB97628f0Ef5";          
  var signerId = document.getElementById('signerId').value; 

  var data = {
    name :name,
    certNo:certNumber,
    cgpa: cgpa,
    to: certifiedTo,
    //signer: signerId
  }

  var dataToVerify = JSON.stringify(data)
  var certNumberAsHex = web3.utils.numberToHex(certNumber)
  var contractInstance = new window.web3.eth.Contract(abi, contractAddress);
  contractInstance.getPastEvents('certificateApproved', {filter:{_certificateNo: certNumberAsHex}, fromBlock: 0,
    toBlock: 'latest'}, (error, events)=>{
    var signatureFromEvent = events[0].returnValues['_signature'];
    var signedByFromEvent = events[0].returnValues['signedBy']

    window.web3.eth.personal.ecRecover(dataToVerify, signatureFromEvent).then((a)=>{
      if(a == signedByFromEvent)
        alert(verified);
      else
        alert("Verification failed")
    })
  });
  
  /*TODO
    getPastEvents('')  ====(DONE)====
    signedby - getThisValue from past event.
    if(web3.eth.personal.ecREcover(dataToVerify,Signature) == signedBy)
      alert('verified')
  */
}

function getDefaultAccount(){
    
  return new Promise((resolve,reject)=>{
    window.web3.eth.getAccounts().then((accounts)=>{
      resolve(accounts[0]);
    }).catch((error)=>{
      reject(error)
    });
  })

}


async function checkAndInjectProvider(){
  
  if(window.ethereum === undefined){
    alert("Metamask Not Installed..")
  }else{
    window.web3 = new Web3(ethereum);

    try {

      await ethereum.enable();
      
    }catch(error){
      console.log(error)

      //TODO - 'findout the error msg to fill below'
      switch (error){
        //TODO 
        case '':
        console.log(error);
        break;

        case '':
        console.log(error);
        break;
      }
    }
    if(ethereum.networkVersion != '1')
      console.log('Change to mainNet...')
  }
}