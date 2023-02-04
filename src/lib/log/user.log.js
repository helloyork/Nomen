import sqlite3 from "sqlite3";
const database = new (sqlite3.verbose()).Database('log.db', (err) => {
    console.log(`[Database: user.log] Connect`)
    if (err) console.error(err);
})

export async function sql(callback) {
    console.log(`[Database: user.log] Run sql`)
    var tstart = Date.now();

    if (callback && typeof callback == "function") {
        _sql`
                CREATE TABLE IF NOT EXISTS user (
                    username TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    content TEXT NOT NULL
                )
            `.then(async v => {
            console.log(`[Database: user.log] Edit`);
            await callback({ insert });
            console.log(`[Database: user.log] Done in ${Date.now() - tstart} ms`);
            // database.close();
        }).catch(r => {
            console.error(r);
            // database.close();
        })
    } else {
        // database.close();
        console.log(`[Database: user.log] Done in ${Date.now() - tstart} ms`);
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
//`INSERT INTO user VALUES("test user","test","test content")`