import sqlite3 from "sqlite3";

const database = new (sqlite3.verbose()).Database('webdata.db', sqlite3.OPEN_READWRITE, (err) => {
    console.log(`[Database: user.log] Connect`);
    if (err) console.error(err);
})
database.all(`SELECT * FROM webdata`,(err,rows)=>{
    if(err)console.error(err);
    if(rows){
        rows.forEach(v=>{
            console.log(v);
        })
    }
})
database.close((err) => {
    console.log(`[Database: user.log] Close`);
    if (err) console.error(err.message);
});