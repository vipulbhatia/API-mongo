var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var users_schema = new Schema({
    username: {type : String , required : true},
    password: {type : String , required : true},
    nsp: {type: String, required: true},
    status: {type: String, required: false},
    role: {type: String, required: false}
},{collection:"users"});

var Users = mongoose.model('Users', users_schema);
module.exports = Users;
