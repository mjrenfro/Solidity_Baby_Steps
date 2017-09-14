//Migrations are executed in their enumerated order


//Importing the desired contract artifacts from the build folder
var Adoption = artifacts.require("./Adoption.sol");

//Export a single, anonymous function taking one argument deployer
module.exports = function (deployer)
{
	//Orders the deployment of a given contract
	deployer.deploy(Adoption);

};


