import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';


import './main.html';


Wallets = new Mongo.Collection('wallets');
client = new CoinStack('944b961ada3e5942bbe09f24ea4a24', '510ebe8ceed5674dfa04212048ad62');
client.endpoint = "testchain.blocko.io";
client.protocol = 'http://';

privateKey = 'L2FnkYrWMt8wPWY133qFoytmAYWUDmZKHQ9g8DPPWf1oWU1nAtHh';
address = CoinStack.ECKey.deriveAddress(privateKey);


// client



Template.hello.helpers({
});

Template.send.events({
  'click #btcsend':function(e){
    var txBuilder = client.createTransactionBuilder();
    txBuilder.addOutput($('#btcaddress').val(), CoinStack.Math.toSatoshi($('#btcvalue').val()));
    txBuilder.setInput('1HNg35LA9bRGbo49D8tK2ynxoidc8spmUG');
    txBuilder.buildTransaction(function(err, tx) {
      if(err) {
        console.log(err);
      }
      tx.sign(privateKey);
      var rawTx = tx.serialize();
      console.log(rawTx);
      client.sendTransaction(rawTx, function(err) {
        if (null != err) {
          console.log("failed to send tx");
        }
      });
    });

    client.getUnspentOutputs(address, function(err, result) {
      console.log('result: ', result);
    });

    console.log($('#btcaddress').val());
    console.log($('#btcvalue').val());
  }
});

Template.info.helpers({
  address: function(){
    return Wallets.findOne()._id;
  },
  bitcoinAddressQR: function(){
    return 'bitcoin:' + address + '?amount=1.2';
  },
  balance: function(){
    return Wallets.findOne().balance + '(코인)';
  },
  Transactions: function(){
    return Wallets.findOne().Transactions;
  },
  result: function(){
    return Wallets.findOne().result;
  },
  userImage: function(){
    if (Meteor.user()) {
      return Meteor.user().profile.thumbnail_image;
    }
  },
  username: function(){
    if (Meteor.user()) {
      return Meteor.user().profile.username;
    }
  },
});
