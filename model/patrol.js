var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var patrol_schema = new Schema({
    tool: {type : String , required : true},
    source: {type : String , required : true},
    account: {type : String , required : true},
    esm_name: {type : String , required : true},
    config:[Schema.Types.Mixed]
},{collection:'patrol'});

var Patrol = mongoose.model('Partol', patrol_schema);

module.exports = Patrol;