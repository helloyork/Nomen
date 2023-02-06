//@ts-nocheck

import sqlite3 from "sqlite3";
const database = new (sqlite3.verbose()).Database('src/lib/log/log.db', (err) => {
    if (err) console.error(err);
})

/**
 * @callback action
 * @param {Object} actions
 */
/**
 * @param {action} callback 
 */
export async function sql(callback) {
    if (callback && typeof callback == "function") {
        _sql`
                CREATE TABLE IF NOT EXISTS user (
                    username TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    content TEXT NOT NULL
                )
            `.then(async v => {
            await callback({ insert });
        }).catch(r => {
            console.error(r);
        })
    }
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

function insert(username, content) {
    let d = new Date();
    let c = `M${d.getMonth() + 1}-D${d.getDate()}-${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    return _sql`INSERT INTO user VALUES(${username},${c},${JSON.stringify(content)})`;
}