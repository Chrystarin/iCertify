const paymongo = require('api')('@paymongo/v2#5u9922cl2759teo');

const { PAYMONGO_SECRET } = process.env;

paymongo.auth(PAYMONGO_SECRET);

module.exports = paymongo;
