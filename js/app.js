var Client = require('node-rest-client').Client;
 
client = new Client();
 
var host = 'http://127.0.0.1:8080';
var user = 'admin';
var pass = 'admin';
var token = null;
var url_login = host + '/api/login';
var url_boards = host + '/api/boards';
var url_board = host + '/api/board/';

$(function(){
	if(token == null) {
	    var args = {
	        data: { username: "admin", password: "admin", rememberme: false},
	        headers:{"Content-Type": "application/json"} 
	    };
	    

	    client.post(url_login, args, function(data,response) {
	        
	        if(data.message == "Login successful.") {
	            token = data.data;
	            updateAll();
	        }
	        else {
	            console.log(response);
	        }

	    });
	}

	function updateAll() {
	 	get(url_boards, function (data, response) {
	            updateBoards(data.data);
	        });
	}

	function updateBoards(data) {

	    console.log(data);

	   	// $('.boardsListing').empty();
		
		var child = $('.boardsListing').children();
		var html = '';

		for(var i = 0; i < data.length; i++) {
			console.log(data[i]);
			html += '<li class="board" data-id="'+data[i].id+'"><a href="#"><span class="mif-apps icon"></span><span class="title">'+data[i].name+'</span><span class="counter"></span></a></li>'
			
		}

		child.before(html);
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

 	function loadBoard(id) {
 		$('#cell-content').show();
        get(url_boards, function (data) {
            data = data.data;
            console.log(data);
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

					// Category
					var html = '';
            		for(var iCat = 0; iCat < current.ownCategory.length; iCat++) {

            			var cat = current.ownCategory[iCat];
            			html += '<option value="'+ cat.id+'">'+cat.name+'</option>';
            		}
					$('#category').children().after(html);
            		

            		//Assign to
					var html = '';
            		for(var iAss = 0; iAss < current.sharedUser.length; iAss++) {

            			var ass = current.sharedUser[iAss];
            			html += '<option value="'+ ass.id+'">'+ass.username+'</option>';
            		}
					$('#assign').children().after(html);


            		return;
            	}
            }
        });
    }

	//  Animation 
    $('.sidebar').on('click', 'li', function(){
        if (!$(this).hasClass('active')) {
            $('.sidebar li').removeClass('active');
            $(this).addClass('active');
        }

        var id = $(this).attr('data-id');

        if(id != undefined && id != 0) {
            loadBoard(id);
        }
    })

    $('.accordion').accordion();

})