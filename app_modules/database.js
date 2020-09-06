const connector = require('../database/database');

class Database {

    constructor() {}

    select(table, selector = '*', where = '') {
        return new Promise((resolve, reject) => {
            if (where != '') {
                where = `where ${where}`;
            }
            connector.query(`select ${selector} from ${table} ${where}`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    update(table, data, where = '') {
        return new Promise((resolve, reject) => {
            if (where != '') {
                where = `where ${where}`;
            }
            connector.query(`update ${table} set ? ${where}`, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('updated');
                }
            })
        })
    }

    insert(table, data) {
        return new Promise((resolve, reject) => {
            connector.query(`insert into ${table} set ?`, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('saved');
                }
            })
        })
    }

    delete(table, where = null) {
        return new Promise((resolve, reject) => {
            if (where != '') {
                where = `where ${where}`;
            }
            connector.query(`delete from ${table} ${where}`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('deleted');
                }
            })
        })
    }

    execute(query) {
        return new Promise((resolve, reject) => {
            connector.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = Database