var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signer",
				"type": "address"
			}
		],
		"name": "addSigner",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_certificateNo",
				"type": "uint256"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "certificateHash",
				"type": "bytes"
			},
			{
				"name": "_signerId",
				"type": "uint256"
			}
		],
		"name": "broadcast",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signerId",
				"type": "uint256"
			},
			{
				"name": "_newSignerAddress",
				"type": "address"
			}
		],
		"name": "modifySigner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_signerId",
				"type": "uint256"
			}
		],
		"name": "removeSigner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_approver",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_certificateNo",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_signature",
				"type": "bytes"
			},
			{
				"indexed": false,
				"name": "_timestamp",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_issuedTo",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "signedBy",
				"type": "address"
			}
		],
		"name": "certificateApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "uint256"
			}
		],
		"name": "signerAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "uint256"
			}
		],
		"name": "signerRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "",
				"type": "address"
			}
		],
		"name": "signerModified",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_certificateNo",
				"type": "uint256"
			}
		],
		"name": "getCertificateDetails",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]