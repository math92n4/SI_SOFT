import mysql from 'mysql2/promise';
import pkg from 'pg';

const { Client } = pkg;


async function migrate() {

    const mysqlConnection = await mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'db'
    });

    const pgClient = new Client({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'db',
    });

    await pgClient.connect();

    try {
        const [userRows] = await mysqlConnection.execute('SELECT * FROM users');

        for (const row of userRows) {

            const { id, name, email } = row;

            const query = 'INSERT INTO users (id, name, email) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email';

            const values = [id, name, email];

            await pgClient.query(query, values);
        }

        console.log('Migration completed');

    } catch (error) {

        console.error('Migration failed:', error);

    } finally {

        await mysqlConnection.end();
        await pgClient.end();

    }

}

migrate();


//*
//
// MYSQL:
// docker exec -it mysql bash
// mysql -u user -p
// 
//
// POSTGRESQL:
// docker exec -it postgres bash
// psql -U user -d db
// 
// */