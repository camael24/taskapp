// Check if is sever install 


var ls = localStorage;

var host = ls.url;
var user = ls.user;
var pass = ls.pass;

var url_login = host + '/api/login';
var url_boards = host + '/api/boards'