//@ts-nocheck

import sqlite3, { OPEN_CREATE } from "sqlite3";
const database = new (sqlite3.verbose()).Database('src/lib/env/env.db',  (err) => {
    if (err) console.error(err);
})
_sql`
    CREATE TABLE IF NOT EXISTS env (
        ikey TEXT NOT NULL,
        value TEXT
    )
`;

export async function envwrite(key, value) {
    return new Promise((resolve, reject) => {
        _sql`INSERT INTO env VALUES(${key},${JSON.stringify(value)}) ON CONFLICT DO UPDATE SET value = excluded.value`
            .then(() => { resolve(md5(content)) })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    })
}

export async function envread(key) {
    return new Promise((resolve, reject) => {
        database.all(`SELECT * FROM env WHERE ikey = ?`, key, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }else {console.log(rows);resolve(JSON.parse((rows[0]===undefined||rows[0].value===undefined?{}:rows[0].value)));}
            
            
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

// export const dataenv = {write,read}

