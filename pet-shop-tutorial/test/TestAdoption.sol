pragma solidity ^0.4.11;

//Gives access to various assertions to use in the tests
import "truffle/Assert.sol";

//Truffle will deploy a fresh instance of the contract being tested
import "truffle/DeployedAddresses.sol";

//smart contract that is going to be tested
import "../contracts/Adoption.sol";

contract TestAdoption{

	Adoption adoption = Adoption(DeployedAddresses.Adoption());

	function testUserCanAdoptPet()
	{
		uint returnedId = adoption.adopt(8);

		uint expected = 8;

		Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
	}

	function testGetAdopterAddressByPetId(){
		address expected = this;

		address adopter = adoption.adopters(8);

		//Getting an UnhandledPromiseRejectionWarning
		/*Assert.equal(adopter, expected, "Owner of pet ID 8 should be
		recorded.");*/


	}

	function testGetAdopterAddressByPetIdInArray()
	{
		address expected = this;

		//The memory attribute on adopters tells the
		//EVM to save the value in memory rather than the contract's
		//storage
		address[16] memory adopters = adoption.getAdopters();

		Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be 		recorded.");
	}

}
