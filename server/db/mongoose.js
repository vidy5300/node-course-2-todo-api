var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
});

module.exports = {mongoose}
/* before ES6
module.exports = {
    mongoose: mongoose
}
*/