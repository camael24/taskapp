var Client = require('node-rest-client').Client;
 
client = new Client();



$(function(){
    $('input[name="username"]').val(user);
    $('input[name="password"]').val(pass);
    $('input[name="url"]').val(host);
    $('input[name="token"]').val(token);

    $('input[type="submit"]').click(function (e) {
        e.preventDefault();
        
        

        n_user                 = $('input[name="username"]').val();
        n_pass                 = $('input[name="password"]').val();
        n_url                  = $('input[name="url"]').val();
        
        var args = {
            data: { username: n_user, password: n_pass, rememberme: false},
            headers:{"Content-Type": "application/json"} 
        };
 
         client.post(n_url+ '/api/login', args, function(data,response) {

             if(data.message == "Login successful.") {
 
                ls.user     = $('input[name="username"]').val();
                ls.pass     = $('input[name="password"]').val();
                ls.url      = $('input[name="url"]').val();
                ls.token    = data.data;
                token       = data.data;
                notify('success' , 'Credential are valid', true);
             }
             else {
                 notify('error' , 'Credential not valid', true);
                 // console.log(response);
             }
 
         }).on('error',function(err){
            notify('error' , 'Credential not valid', true);
        });

    });

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
    }

    function reset() {
        window.location.reload();
    }

})