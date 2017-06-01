//Example from http://solidity.readthedocs.io/en/develop/introduction-to-smart-contracts.html

//Lets anyone store and access a number

//TODO: include instructions on how to run


//This code will compile with versions [0.4.0, 0.5.0)
pragma solidity ^0.4.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x)
    {
        storedData=x;
    }
    function get() constant returns (uint){
        return storedData;
    }

}
