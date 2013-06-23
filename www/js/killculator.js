

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
                        //alert('error');
                        //Error - user not created
                        return false;
                        } else {
                        //Success - user created
                        var name = marty.get('name');
                        //alert(name);
                        window.location = 'index.html#home';
                        }
                        });
    //alert('after signup');
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
                 load_heat_map();
                 window.location = 'index.html#home';
                 }
                 
                 });
    
}

function cshot() {
    
    //Then make calls against the API.  For example, you can
    //get the logged in user entity this way:
    client.getLoggedInUser(function(err, data, user) {
        if(err) {
            //Error - could not get logged in user
            alert(err);
        } else {
            var username = user.get('username');
            var options = { "type": "shots",
                        "x": $('#horizontalnuminput').val(),
                        "y": $('#verticalnuminput').val(),
                        "distance": $('#distanceselect').val(),
                        "author": user.get('username')};
            client.createEntity(options, function (err, response) {

            if (err) { alert("write failed");
            } else { } });
        }
    });
}

function load_heat_map(){
    
    // Reading data
    
    
    
    client.getLoggedInUser(function(err, data, user) {
                           
                           if(err) {
                           
                           alert("failed to get user");
                           
                           }
                           
                           else {
                           
                           var config = {
                           
                           "element": document.getElementById("heatmapArea"),
                           
                           "radius": 20,
                           
                           "opacity": 50,
                           
                           "visible": true
                           
                           };
                           
                           var heatmap = h337.create(config);
                           
                           
                           
                           var shots = new Usergrid.Collection({ "client":client, "type":"shots", qs:{ limit:50, ql:"select * where author='" + user.get('username')+ "'"}});
                           
                           shots.fetch(
                                       
                                       function() { // Success
                                       
                                       var heatmapdata = {
                                       
                                       max: 20,
                                       
                                       data: []
                                       
                                       };
                                       
                                       while(shots.hasNextEntity()) {
                                       
                                       var shot = shots.getNextEntity();
                                       
                                       //                                            alert(shot.get("x"));
                                       
                                       //                                            alert(shot.get("y"));
                                       
                                       heatmapdata.data.push({
                                                             
                                                             "x": Number(shot.get("x")),
                                                             
                                                             "y": Number(shot.get("y")),
                                                             
                                                             "count": 20
                                                             
                                                             });
                                       
                                       
                                       
                                       
                                       
                                       }
                                       
                                       heatmap.store.setDataSet(heatmapdata);
                                       
                                       }, function() { // Failure
                                       
                                       alert("read failed");
                                       
                                       });
                           
                           
                           
                           
                           
                           }
                           
                           });
    
    
    
    
    
    
    
}


function calcPercentages(sel) {
    var target = sel.options[sel.selectedIndex].value;
    console.log(target);
    var killRadius = 1;
    var woundRadius = 2;
    if (target == 'boar') {
        killRadius = 5;
        woundRadius = 10;
    } else if (target == 'deer') {
        killRadius = 5;
        woundRadius = 15;
    } else if (target == 'norris') {
        killRadius = 0;
        woundRadius = 0;
    } else if (target == 'sasquach') {
        killRadius = 6;
        woundRadius = 30;
    }

    // Reading data
    var shots = new Usergrid.Collection({ "client":client, "type":"shots", qs:{ limit:50, ql:'order by created ASC'}  });
    var totalShots = 0;
    shots.fetch(
        function() { // Success
            while(shots.hasNextEntity()) {
                var shot = shots.getNextEntity();
                totalShots++;
                //alert(book.get("title")); // Output the title of the book

                var x = Number(shot.get("x"));
                var y = Number(shot.get("y"));
                var distance1 = Number(shot.get("distance"));
                var distance2 = 0;

                var kills = 3;
                var wounds = 6;

                var k = killRadius - ((distance1 + distance2) * (Math.sqrt((x*x) + (y*y))/ distance1));
                var w = woundRadius - ((distance1 + distance2) * (Math.sqrt((x*x) + (y*y))/ distance1));
                console.log(k);
                console.log(w);

                if (k > 0){
                    kills++;
                }

                if (w > 0){
                    wounds++;
                }
                
                //console.log(kills);
                //console.log(wounds);
                //console.log(totalShots);
                var killPercent = (kills/totalShots) * 100;
                var woundPercent = (wounds/totalShots) * 100;
                $('#kill50yards p').text(Math.round(killPercent) + "%");
                $('#wound50yards p').text(Math.round(woundPercent) + "%");

                distance2 = 100;
                var kills = 2;
                var wounds = 4;
                
                k = killRadius - ((distance1 + distance2) * (Math.sqrt((x*x) + (y*y))/ distance1));
                w = woundRadius - ((distance1 + distance2) * (Math.sqrt((x*x) + (y*y))/ distance1));
                if (k > 0){
                    kills++;
                }

                if (w > 0){
                    wounds++;
                }
                
                
                var killPercent = (kills/totalShots) * 100;
                var woundPercent = (wounds/totalShots) * 100;
                $('#kill100yards p').text(Math.round(killPercent) + "%");
                $('#wound100yards p').text(Math.round(woundPercent) + "%");


                distance2 = 200;
                var kills = 1;
                var wounds = 2;

                k = killRadius - ((distance1 + distance2) * (Math.sqrt((x*x) + (y*y))/ distance1));
                w = woundRadius - ((distance1 + distance2) * (Math.sqrt((x*x) + (y*y))/ distance1));
                if (k > 0){
                    kills++;
                }

                if (w > 0){
                    wounds++;
                }
                
                
                var killPercent = (kills/totalShots) * 100;
                var woundPercent = (wounds/totalShots) * 100;
                $('#kill200yards p').text(Math.round(killPercent) + "%");
                $('#wound200yards p').text(Math.round(woundPercent) + "%");

                if (target == 'norris') {
                     $('#kill50yards p').text("0%");
                     $('#wound50yards p').text("0%");
                      $('#kill100yards p').text("0%");
                     $('#wound100yards p').text("0%");
                    $('#kill200yards p').text("0%");
                    $('#wound200yards p').text("0%");
                }


        } }, function() { // Failure
            alert("read failed");
        });


    
    
    

    
}


