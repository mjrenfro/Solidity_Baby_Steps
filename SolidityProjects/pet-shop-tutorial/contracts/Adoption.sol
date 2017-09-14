pragma solidity ^0.4.4;


contract Adoption{
	//array of Ethereum addresses.
	//arrays can only contain one type
	//public=automatic getter methods
	//key is required to access the array's contents
	//Need to write a special function to return the whole array
	address[16] public adopters;

	//populates the adopters array with the address of
	//who wants to adopt the pet
	function adopt(uint petId) public returns (uint)
	{ 
		require(petId >= 0 && petId <= 15);
		adopters[petId] = msg.sender;
		return petId;
	}

	//retrieve the adopters
	//Don't want to make 16 API calls
	function getAdopters ()  public returns (address [16]) {
		return adopters;
	}







}
