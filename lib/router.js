FlowRouter.route('/',{
  action: function(){
    BlazeLayout.render('home', {content:'info'});
  }
});

FlowRouter.route('/send',{
  action: function(){
    BlazeLayout.render('home', {content:'send'});
  }
});


FlowRouter.route('/send_complete',{
  action: function(){
    BlazeLayout.render('home', {content:'send_complete'});
  }
});
