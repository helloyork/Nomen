//@ts-nocheck

import sqlite3 from "sqlite3";
import md5 from "md5";
import fs from "fs";
const database = new (sqlite3.verbose()).Database('src/lib/webdata/webdata.db', (err) => {
    if (err) console.error(err);
})
_sql`
    CREATE TABLE IF NOT EXISTS webdata (
        identifier TEXT NOT NULL,
        origin TEXT NOT NULL,
        content TEXT NOT NULL
    )
`;

export async function write(origin, content) {
    return new Promise((resolve, reject) => {
        read(md5(content)).then(rows => {
            if (rows.length <= 0) {
                _sql`INSERT INTO webdata VALUES(${md5(content)},${origin},${content})`
                    .then(() => { console.log(`[Database: webdata.db] Write Done`); resolve(md5(content)) })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    });
            } else {
                console.log(`[Database: webdata.db] Write Done`);
                resolve(md5(content));
            }
        })
    })
}

export async function read(identifier) {
    return new Promise((resolve, reject) => {
        console.log(`[Database: webdata.db] Read`)
        database.all(`SELECT * FROM webdata WHERE identifier = ?`, identifier, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve(rows);
        })
    })
}

export async function view() {
    return new Promise((resolve, reject) => {
        console.log(`[Database: webdata.db] View`)
        database.all(`SELECT identifier,origin FROM webdata`, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else fs.stat('src/lib/webdata/webdata.db', (err, stats) => {
                if (err) console.error(err);
                else resolve({rows:rows,size:stats.size});
            });
        })
    })
}

export async function clear(identifier) {
    return new Promise((resolve, reject) => {
        console.log(`[Database: webdata.db] Clear`)
        database.all(`DELETE FROM webdata WHERE identifier = ?`,identifier, (err, rows) => {
            if (err) {
                console.log(err);
                reject(err);
            } else resolve(rows);
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

