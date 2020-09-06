const crypto = require('crypto'),
    key = crypto.randomBytes(32),
    bcrypt = require('bcrypt'),
    iv = crypto.randomBytes(16);

module.exports.getCurrentDateAndTime = () => {
    let now = new Date(),
        date = now.getFullYear() + '-' + ((now.getMonth() + 1).toString().length < 2 ? +'0' + (now.getMonth() + 1).toString() : now.getMonth() + 1) + '-' + (now.getDate().length < 2 ? +'0' + now.getDate() : now.getDate());
    time = (now.getHours().toString().length < 2 ? '0' + now.getHours().toString() : now.getHours()) + ':' + (now.getMinutes().toString().length < 2 ? '0' + now.getMinutes().toString() : now.getMinutes()) + ':' + (now.getSeconds().toString().length < 2 ? '0' + now.getSeconds().toString() : now.getSeconds());

    return date + ' ' + time;
};

module.exports.getCurrentDate = () => {
    let _date = this.getCurrentDateAndTime().split(' ')[0];
    return _date;
};

module.exports.encrypt = (value) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv),
        encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let _iv = iv.toString('hex'),
        encryptedData = encrypted.toString('hex');
    return `${_iv}.${encryptedData}`;
};

module.exports.decrypt = (value) => {
    let iv = Buffer.from(value.split('.')[0], 'hex');
    let encryptedText = Buffer.from(value.split('.')[1], 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

module.exports.generateString = (length) => {
    let result = '',
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.',
        charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports.generatePassword = (length) => {
    let result = '',

        maj = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        min = 'abcdefghijklmnopqrstuvwxyz',
        num = '0123456789',
        spec = `@^$/-;.?=+*|'"()[]#&`,
        all = `${maj}${min}${num}${spec}`,

        majLength = maj.length,
        minLength = min.length,
        numLength = num.length,
        specLength = spec.length,
        allLength = all.length;

    result += maj.charAt(Math.floor(Math.random() * majLength));
    result += min.charAt(Math.floor(Math.random() * minLength));
    result += num.charAt(Math.floor(Math.random() * numLength));
    result += spec.charAt(Math.floor(Math.random() * specLength));

    for (var i = 0; i < length; i++) {
        result += all.charAt(Math.floor(Math.random() * allLength));
    }

    return result;
};

module.exports.signPassword = (str) => {
    return bcrypt.hash(str, 10);
}

module.exports.matchPassword = (plainText, hash) => {
    return bcrypt.compare(plainText, hash);
}