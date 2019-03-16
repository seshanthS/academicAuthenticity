var contractAddress = "0x23c4afef9623cc762a4649aaa319b1b50aaade74";
async function signAndSubmit(){
  //var web3 = window.web3;
  checkAndInjectProvider();
  var acc = await getDefaultAccount();
  var name = document.getElementById('name').value
  var certNumber = document.getElementById('certificateNumber').value
  var cgpa = document.getElementById('cgpa').value
  //============================
  //TODO - add fields for signerId, certifiedTo
  // calculate hash of data{} - certHash
  var certifiedTo = "0xF8E7cFf01db79c156C6aE7e2804fbB97628f0Ef5";          
  var signerId = 1; 
  var certHash = window.web3.utils.asciiToHex('1');      //to be removed      
  //============================       
  var data ={
    name :name,
    certNo:certNumber,
    cgpa: cgpa
  }
  var dataToSign = JSON.stringify(data)
  window.web3.eth.personal.sign(dataToSign, await getDefaultAccount()).then((signature)=>{
    var contractInstance = new window.web3.eth.Contract(abi, contractAddress);
    
    contractInstance.methods.broadcast(certNumber, certifiedTo, signature, signerId).send({from: acc})
    .on('transactionHash',(txHash)=>{
      alert("transaction Hash : " + txHash );
    });
  })
  
}

function verify(){
  var name = document.getElementById('name').value
  var certNumber = document.getElementById('certificateNumber').value
  var cgpa = document.getElementById('cgpa').value
  var data ={
    name :name,
    certNo:certNumber,
    cgpa: cgpa
  }
  var dataToVerify = JSON.stringify(data)
  /*TODO
    getPastEvents('')
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