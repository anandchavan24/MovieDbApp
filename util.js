const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
    const hash = crypto.createHash('sha256', '12345678abcdefgh')
                    
    // updating data
    .update(text)

    // Encoding to be used
    .digest('hex');
    return hash.slice(0,32);
}

// Decrypting text
function decrypt(text) {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
}

module.exports = {encrypt,decrypt}
// Text send to encrypt function
// var hw = encrypt("Welcome to Tutorials Point...")
// console.log(hw)
// console.log(decrypt(hw))