const { Pool } = require('pg');

const pool=new Pool({
    user:"postgres",
    password:"Postgres",
    host:"localhost",
    port:"5432",
    database:"SkyLine",
});

module.exports=pool;




