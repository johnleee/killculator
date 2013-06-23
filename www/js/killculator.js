

var client = new Usergrid.Client({
                                 orgName:'abhishekshiroor', // Your Usergrid organization name (or apigee.com username for App Services)
                                 appName:'killculator',
                                 buildCurl: true,
                                 logging: true
                                 });

$(document).ready(function() {
                  $('#textinput9').focus(function() {
                                         $('#textinput9').css({'border':'0px'});
                                         });
                  $('#textinput10').focus(function() {
                                          $('#textinput10').css({'border':'0px'});
                                          });
                  $('#textinput4').focus(function() {
                                         $('#textinput4').css({'border':'0px'});
                                         });
                  $('#textinput6').focus(function() {
                                          $('#textinput6').css({'border':'0px'});
                                          });
                  $('#textinput7').focus(function() {
                                         $('#textinput7').css({'border':'0px'});
                                         });

                  
                  
                  });

function cuser() {
    // Initializing the SDK
    
    if(jQuery.trim($('#textinput4').val())==0){
        $('#textinput4').attr('placeholder', 'Enter a valid first name');
        $('#textinput4').css({'border':'4px solid red'});
        return false;
    }
    
    if(jQuery.trim($('#textinput6').val())==0){
        $('#textinput6').attr('placeholder', 'Enter a valid email');
        $('#textinput6').css({'border':'4px solid red'});
        return false;
    }
    
    if(jQuery.trim($('#textinput7').val())==0){
        $('#textinput7').attr('placeholder', 'Enter a valid password');
        $('#textinput7').css({'border':'4px solid red'});
        return false;
    }
    
    var options = {
    type:'users',
    name:$('#textinput4').val(),
    username:$('#textinput6').val(),
    password:$('#textinput7').val(),
    city:'San Francisco'
    };
    
    client.createEntity(options, function (err, marty) {
                        if (err){
                        alert('error');
                        //Error - user not created
                        } else {
                        //Success - user created
                        var name = marty.get('name');
                        alert(name);
                        }
                        });
    alert('after signup');
}



function luser(){
    if(jQuery.trim($('#textinput9').val())==0){
        $('#textinput9').attr('placeholder', 'Enter a valid email');
        $('#textinput9').css({'border':'4px solid red'});
        return false;
    }
    
    if(jQuery.trim($('#textinput10').val())==0){
        $('#textinput10').attr('placeholder', 'Enter a valid password');
        $('#textinput10').css({'border':'4px solid red'});
        return false;
    }
    client.login($('#textinput9').val(), $('#textinput10').val(), function (err) {
                 if (err) {
                 
                 alert('Please enter valid email/password');
                 return false;
                 } else {
                 //Success - user has been logged in
                 
                 //the login call will return an OAuth token, which is saved
                 //in the client. Any calls made now will use the token.
                 //once a user has logged in, their user object is stored
                 //in the client and you can access it this way:
                 var token = client.token;
                 
                 //Then make calls against the API.  For example, you can
                 //get the logged in user entity this way:
                 client.getLoggedInUser(function(err, data, user) {
                                        if(err) {
                                        //Error - could not get logged in user
                                        } else {
                                        var username = user.get('city');
                                        }
                                        });
                 window.location = 'index.html#home';
                 }
                 
                 });
    
}