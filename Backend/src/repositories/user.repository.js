import dbConnection from '../config/db_config.js';
import { v7 as uuidv7 } from 'uuid';

class userRepository {
    //Find User by Email
    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
        const [rows] = await dbConnection.execute(query, [email]);

        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }

    //Create User
    async createUser(email, username, password_hash) {
        const userId = uuidv7();

        const query = 'INSERT INTO users (user_id, email, username, password_hash) VALUES (?, ?, ?, ?)';
        await dbConnectionq.execute(query, [user, email, username, password_hash]);

        return {
            id: userId,
            username,
            email
        };
    }

    //Update & Change Password
    async updatePassword(user_id, password_hash) {
        const query = 'UPDATE users SET password_hash = ? WHERE user_id = ?';
        const [result] = await dbConnection.execute(query, [password_hash, user_id]);

        return result.affectedRows > 0;//boolean result
    }

    //Delete User
    async deleteUser(userId) {
        const query = 'DELETE FROM users WHERE user_id = ?';
        const [result] = await dbConnection.execute(query, [userId]);

        return result.affectedRows > 0;
    }

    //Verify Email
    async verifyEmail(userId) {
        const query = 'UPDATE users SET is_email_verified = true WHERE user_id = ?';
        const [result] = await dbConnection.execute(query, [userId]);

        return result.affectedRows > 0;
    }

    //Active user
    async setActiveStatus(userId, status) {
        const query = 'UPDATE users SET is_active = ? WHERE user_id = ?';

        const [result] = await dbConnection.execute(query, [status, userId]);

        return result.affectedRows > 0; // Boolean
    }

}

export default new userRepository();