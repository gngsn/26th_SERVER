const crypto = require('crypto');
const fs = require('fs');

const encrypt = (salt, password) => {
    return new Promise((res, rej) => {
        crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const digest = derivedKey.toString('hex');
            res(digest);
        });
    });
}

fs.readFile(`${__dirname}/password.txt`, async (err, data) => {
    if (err) return console.log(err.message);

    const password = data.toString();
    const salt = crypto.randomBytes(32).toString('hex');
    const digest = await encrypt(salt, password);
    
    fs.writeFile(`${__dirname}/hashed.txt`, digest, (err) => {
        if (err) return console.log(err.message);
        console.log('success ~ ')
    });
});
