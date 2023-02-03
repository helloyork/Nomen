import sqlite3 from "sqlite3";
import md5 from "md5";
const database = new (sqlite3.verbose()).Database('/project/home/helloyork/workspace/src/lib/webdata/webdata.db',sqlite3.OPEN_READWRITE, (err) => {
    console.log(`[Database: webdata.db] Connect`)
    if (err) console.error(err);
})
_sql`
    CREATE TABLE IF NOT EXISTS webdata (
        identifier TEXT NOT NULL,
        orgin TEXT NOT NULL,
        content TEXT NOT NULL
    )
`;

export async function write(orgin, content) {
    console.log(`[Database: webdata.db] Write`)
    return _sql`INSERT INTO webdata VALUES(${md5(content)},${orgin},${content})`;
}

export async function read(identifier) {
    return new Promise((resolve, reject) => {
        console.log(`[Database: webdata.db] Read`)
        database.all(`SELECT * FROM webdata WHERE identifier = ?`, identifier, (err, rows) => {
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

