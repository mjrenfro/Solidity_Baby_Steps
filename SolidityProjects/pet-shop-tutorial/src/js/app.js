App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    //Initialize web3 and set the provider to the testRPC
    if (typeof web3 !== 'undefined')
    {
      App.web3Provider = web3.currentProvider;
      web3= new Web3(web3.currentProvider);

    }else{
      //set the provider you want from web3.providers
      App.web3Provider = new web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data){

      //Get the necessary contract artifact file and instantiate it with
      //truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Adoption=TruffleContract(AdoptionArtifact);

      //Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      //User our contracts to retrieve and mark the adopted pets
      return App.markAdopted();
      ///<---markAdopted is a separate, UI updating function

    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  handleAdopt: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

    web3.eth.getAccounts(function(err, accounts){
      if(err){
        console.log(err);
      }

      var account = accounts[0];  //only one person can adopt the
                                  //pet, but array of accounts is still
                                  //send via web3.eth.getAccounts and the
                                  //first address is always the adopters address?

      App.contracts.Adoption.deployed().then(function(instance){
        adoptionInstance= instance;

        //paying a transaction to store the data of the adopters's address
        //in the Ethereum smart contract
        return adoptionInstance.adopt(petId, {from: account});

      }).then(function(result){

        return App.markAdopted();

      }).catch(function(err){

        console.log(err.message); //if there are errors with the transaction,
                                  //this line will be executed
      });
    });

  },

  markAdopted: function(adopters, account) {
    var adoptionInstance; //declared outside of the smart contract calls
                          //so that it can be accessed after the calls
                          //have finished

    //Using promises
    App.contracts.Adoption.deployed().then(function(instance){
      adoptionInstance = instance;

      return adoptionInstance.getAdopters.call(); //A call allows reading
                                                  //from the blockchain without
                                                  //having to send a full transaction
                                                  //A free read is the best kind of read

    }).then(function(adopters){

      for(i=0; i<adopters.length; i++){

        //If the pet is adopted, then the adopters address isn't this default addr
        if(adopters[i] !== '0x0000000000000000000000000000000000000000')
        {

          $('.panel-pet').eq(i).find('button').text('Pending...').attr('disabled', true);

        }
      }
    }).catch(function(err){
      console.log(err.message);

    });
  }
}; //end of App definition


$(function() {
  $(window).load(function() {
    App.init();
  });
});
