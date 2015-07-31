var Client = require('node-rest-client').Client;
 
client = new Client();
 


var token = sessionStorage.token;
var currentBoard = null;

console.log(token, user, pass, host);

$(function(){

    if(host == undefined) {
        notify('error', 'Check settings page');
    }


	if(token == undefined) {
	    var args = {
	        data: { username: "admin", password: "admin", rememberme: false},
	        headers:{"Content-Type": "application/json"} 
	    };
	    

	    client.post(url_login, args, function(data,response) {
	        
	        if(data.message == "Login successful.") {
	            
                sessionStorage.token = data.data;
                token = data.data;
	            updateAll();
	        }
	        else {
                notify('error' , 'Credential not valid');
	            // console.log(response);
	        }

	    });
	}
    else {
        updateAll();
    }

	function updateAll() {
        console.log('update');
	 	get(url_boards, function (data, response) {
	            updateBoards(data.data);
	        });
	}

	function updateBoards(data) {
	   	// $('.boardsListing').empty();
		
		var child = $('.boardsListing').children();
		var html = '';

		for(var i = 0; i < data.length; i++) {
			html += '<li data-id="'+data[i].id+'"><a href="#">'+data[i].name+'</a></li>';
			
		}

		child.after(html);
        child.first().remove();
	}


    

	function get(u, f) {
		   if(token != null) {

	        var args = {
	            headers: {
	                "Authorization": token,
	                "Content-Type": "application/json"
	            }
	        }


	        client.get(u, args, f);
	    }
	}


    function post(u, a, f) {
           if(token != null) {

            var args = {
                data: a,
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                }
            }


            client.post(u, args, f);
        }
    }


 	function loadBoard(id) {
 		
        currentBoard = id;
        get(url_boards, function (data) {
            data = data.data;
            



            for(var i = 0; i < data.length; i++) {

            	if(id = data[i].id) {

            		current = data[i];

            		$('#cell-content > .text-light > span').text(current.name);
            		
            		// Lane
            		var html = '';
            		for(var iLane = 0; iLane < current.ownLane.length; iLane ++) {

            			var lane = current.ownLane[iLane];
            			html += '<option value="'+ lane.id+'">'+lane.name+'</option>';
            		}
					$('#lane').children().after(html);
                    $('#lane').children().first().remove();

					// Category
					var html = '';
            		for(var iCat = 0; iCat < current.ownCategory.length; iCat++) {

            			var cat = current.ownCategory[iCat];
            			html += '<option value="'+ cat.id+'">'+cat.name+'</option>';
            		}
					$('#category').children().after(html);
                    // $('#category').children().first().remove();
            		

            		//Assign to
					var html = '';
            		for(var iAss = 0; iAss < current.sharedUser.length; iAss++) {

            			var ass = current.sharedUser[iAss];
            			html += '<option value="'+ ass.id+'">'+ass.username+'</option>';
            		}
					$('#assign').children().after(html);
                    // $('#assign').children().first().remove();
                    
                    $('#cell-content').show();
            		return;
            	}
            }
        });
    }

    function notify(status, message, reload) {

        var n = noty({
            type: status,
            text: message,
            timeout: 2000,
            callback: {
                afterClose: function(reload) {
                    if(reload != undefined && reload == true) {
                        reset();
                    }
                },
            }
        });

        // console.log(message);
    }

    function reset() {
        window.location.reload();
    }

	//  Animation 
    $('.sidebar2').on('click', 'li', function(){
        if (!$(this).hasClass('active')) {
            $('.sidebar2 li').removeClass('active');
            $(this).addClass('active');
        }

        var id = $(this).attr('data-id');

        if(id != undefined && id != 0) {
            loadBoard(id);
        }
    })

    $('.accordion').accordion();

    $('input[type="submit"].success').click(function(e) {
    	e.preventDefault();

// {"title":"ff","description":"","assignee":0,"category":0,"color":"#ffffe0","dueDate":null,"points":null,"lane":"1"}     

        var _post = {
    		title: $('input[name="name').val(),
    		description: $('textarea[name="description"]').val(),
            assignee: $('select[name="assign"]').val(),
            category: $('select[name="category"]').val(),
    		color: $('input[name="color"]').val(),
            dueDate: $('input[name="date"]').val(),
            points: $('input[name="point"]').val(),
            lane: $('select[name="lane"]').val()
    	}

        if(_post.color == '')
            _post.color ='#ffffe0';

        if(_post.dueDate == '')
            _post.dueDate = null;

        if(_post.points == '')
            _post.points = null;

        if(_post.assignee == '')
            _post.assignee = 0;

        if(_post.category == '')
            _post.category = 0;


        if(_post.title != '') {
            if(currentBoard != null) {
                post(url_boards +'/'+currentBoard + '/items', _post, function (data, response) {
                    if(data.alerts[0].type == 'success') {

                        notify('success', 'Item created', true);
                    }
                });
            }
        }
        else {
            notify('error', 'Error name are empty');
        }

    });


    

})