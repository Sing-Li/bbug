MyList = new Meteor.Collection("items")
MyList.allow({
  update: function() {
   return false;
  }
});


if (Meteor.isClient) {
  Template.alist.dpoint = function () {
    return MyList.find({});;
  };

  Template.listitem.rendered = function () {
    console.log("listitem rendered");

    this.$('.editable').editable(
     function(value, settings)  {
            MyList.update($(this).attr('id'), {$set: {total: parseInt(value)}});
            return (value);
     }
      , { 
     type    : 'text',
     style : 'inherit',
     width : 100,
     submit  : 'OK',
  });
 };
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
     MyList.remove({});
     MyList.insert({item: 'first', price:'10'});
     MyList.insert({item: 'second', price:'100'});
     MyList.insert({item: 'third', price:'1000'});
     MyList.insert({item: 'fourth', price:'10000'});

  });
}
