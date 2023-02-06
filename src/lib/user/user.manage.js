//@ts-nocheck

import sqlite3 from "sqlite3";
const database = new (sqlite3.verbose()).Database('./user.db', (err) => {
    console.log(`[Database: user.db] Connect`)
    if (err) console.error(err);
})
_sql`
    CREATE TABLE IF NOT EXISTS user (
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        value TEXT
    )
`;

export async function userwrite(username, password,value) {
    return new Promise((resolve, reject) => {
        userread(username).then(rows => {
            if (rows.length <= 0) {
                _sql`INSERT INTO user VALUES(${username},${password},${value})`
                    .then(() => { console.log(`[user: user.db] Write Done`); resolve(value) })
                    .catch(err => reject(err));
            } else {
                _sql`UPDATE user SET value = ${value} WHERE username = ${username}`
                    .then(() => { console.log(`[Database: user.db] Write Done`); resolve(value) })
                    .catch(err => reject(err));
            }
        }).catch(console.error);
    })
}

/**
 * @param {String} username 
 * @returns {Promise<Object[]|Error|never>}
 */
export async function userread(username) {
    return new Promise((resolve, reject) => {
        database.all(`SELECT * FROM user WHERE username = ?`, username, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        })
    })
}

function _sql(sql, ...params) {
    if (typeof sql == "object") {
        return /** @type {Promise<void>} */(new Promise((resolve, reject) => {
            database.run(sql.join('?'), params, (err) => {
                if (err) reject(err);
                else resolve();
            })
        }))
    } else throw new Error('Please call sql in tag function');
}

