//Not original.
//Source:http://www.talkcrypto.org/blog/2017/04/17/an-ethereum-hello-world-smart-contract-for-beginners-part-1/

//Contract that will fullfill the following banking functions
//Deposit
//GetTotalBalance

pragma solidity ^0.4.0;

contract aBank {

  //kindof like a getter function that requires an
  //input
  //Assuming this can store more than one <address,balance>
  //key value pair
  mapping (address => uint) balanceAccount;

  //no return value...so void (ish)
  //Like a setter function
  //Amount seems to be unitless
  function deposit(uint amt) public {
    //add amount to the balance of the sender
    balanceAccount[msg.sender] += amt;
  }

  function getBalance() returns (uint balance){
    return balanceAccount[msg.sender];
  }

}
