
const crypto = require('crypto');
const secret = 'Hi';
const hash = crypto.createHash('sha256', secret).update('josh123').digest('hex');
module.exports = { hash, sum };