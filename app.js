// Wallet
const connectWalletButton = document.querySelector('#connectWallet');

const accountInput = document.querySelector('#accountNumber');
const checkBalanceButton = document.querySelector('#checkBalance');
const displayBalance = document.querySelector('#balance');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const sendButton = document.querySelector('#sendTx');
const transactionList = document.querySelector('#transactions');
const displayLatestBlock = document.querySelector('#latestBlock');


// Ganache with endpoint
const rpc = new Web3('http://127.0.0.1:7545');


let account;

async function connectWallet () {
    if(typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });    
    }
    else {
        alert('Please install MetaMask extension to your browser');
    }
}

function initApp () {
}

async function checkBalance () {
    account = accountInput.value;
    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
    const formattedBalance = parseInt(balance) / Math.pow(10, 18);
    displayBalance.innerHTML = formattedBalance + ' ETH';   
}


async function sendTransaction () {
    const toAddress = toAccountInput.value;
    const amount = valueInput.value;
    const transactionAmount = parseFloat(amount) * Math.pow(10, 18);


    try {
        const trx = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: account,
                to: toAddress,
                // Convert the amount to ether
                value: Number(transactionAmount).toString(16),
                gas: Number(21000).toString(16),
                gasPrice: Number(20000000).toString(16)

            }]
        });
           
    } catch (error) {
        console.log(error);
    }
}

const lastestBlock = await window.ethereum.request({
    "method": "eth_blockNumber",
  });

  displayLatestBlock.innerHTML = parseInt(lastestBlock);

document.addEventListener('DOMContentLoaded', initApp)
connectWalletButton.addEventListener('click', connectWallet);
checkBalanceButton.addEventListener('click', checkBalance);
sendButton.addEventListener('click', sendTransaction);
