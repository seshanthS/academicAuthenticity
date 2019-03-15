# academicAuthenticity
Task for evaluation
  ### variable definition
  
  **approver** :
         Adress of a University. This account can add additional signers.
         For example, Consider approver as Anna University, And signers are the colleges
         affilated to anna university.
     
     **signer** :
         Signers will sign the certificates offchain. Only Signers can approve the certificate 
         by invoking the broadcast() function. An event certificateApproved will be emited.
         
         
### Certificate generation

  **Step 1** : The signer Enters certificate details such as certificate number, Name of the candidate, CGPA 
  in the webUI.
  
  **step 2** :The data entered is signed using signer's private Key. 
  
    `var signature = {The output from above step}`

  **step 3** :broadcast() function in smartContract is invoked. It emits a event.
  
  parameter1: certificate number.
  
  parameter2: signature.
  
  
  parameter3: address of the signer. This paramerter is important for verification, Because the signer account might in change
  in future. [signedBy]
  
  

### Certificate Verification:
  The employer enters the details in the certificate into the webUI. This process happens completely off-chain.
  Thus certificate can be verified without paying gas fee.
  
  `var data = {employer enters the data}`
  
  #### working
 
    1. getPastEvents(), filterd by certificate No.
    2. get the signature, signedBy from the event.
    3. web3.eth.personal.ecRecover(data, signature)
    4. compare output of 'ecRecover()' and 'signedBy' from the event. If both are same, the cerificate is
       verified. 
       
   ### TODO
   1. Add webUi
