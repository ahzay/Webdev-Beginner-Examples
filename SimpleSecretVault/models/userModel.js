const db = require('../db/db.js');


class UserModel {
    static checkIfExists(username, callback) {
        // SQL query to count users with a specific username
        /* 
        SELECT COUNT(*): Counts number of rows that match the condition.
        AS count: Renames the count result to 'count' for easy reference.
        FROM testdb.users: Indicates selection from 'users' table in 'testdb'.
        WHERE username = ?: Filters rows to those where 'username' matches the input.
        '?' is a placeholder for parameterized query.
        */
        const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) throw err;
            callback(results[0].count > 0);
        });
    }

    static create(username, callback) {
        this.checkIfExists(username, result_checkIfExists => { // callback style because async
            exists = result_checkIfExists;
            console.log(`Hashed user ${username} exists: ${exists}`);
            // the following code should only be called in the callback (when checking that exists is done)
            if (exists) { // nothing
                console.log("User already exists")
            } else {
                const query = 'INSERT INTO users (username) VALUES (?)';
                db.query(query, [username], (err, result) => {
                    if (err) throw err;
                    console.log("User created successfully")
                    callback(result);
                });
            }
        });
    }
}


module.exports = UserModel
