const mysql = require('mysql');

const connexion = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'ikcs',
    password: '18mNR7N2H7Kp',
    database: 'family'
});

connexion.getConnection((err, connect) => {
    if (err) {
        console.log(err);
    }
})

module.exports = connexion