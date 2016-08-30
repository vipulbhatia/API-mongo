var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var portal_schema = new Schema({
    tool: {type : String , required : true},
    source: {type : String , required : true},
    account: {type : String , required : true},
    esm_name: {type : String , required : true},
    config:[Schema.Types.Mixed]
},{collection:'portal'});

var Portal = mongoose.model('Portal', portal_schema);

module.exports = Portal;