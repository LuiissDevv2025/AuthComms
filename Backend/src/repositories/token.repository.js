import dbConnection from '../config/db_config.js';
const { v4: uuidv4 } = require('uuid');

class tokenRepository {
    //--> Updated, it's not good practice to store the entire token, how to fix this is the other file
    //is the one that creates the refresh token
    async storeRefreshToken(userId, tokenString, expiresAt) {
        //Generate PK
        const tokenId = uuidv4();
        const createdAt = new Date();
        const revoked = false;

        //SQL
        const query = `
            INSERT INTO User_Tokens (token_id, user_id, refresh_token, expires_at, revoked, created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const value = [tokenId, userId, tokenString, expiresAt, revoked, createdAt];


        const result = await dbConnection.query(query, values);

        if (!result) {
            throw new Error('Database error saving tokens');
        }

        return result;
    }

    //Token Retrival
    async getValidRefreshToken(user_id, tokenString) {
        const query = `
                SELECT * FROM User_Tokens
                WHERE user_id = $1
                AND refresh_token = $2
                AND revoked = false 
                AND expires_at > NOW()
                LIMIT 1;
            `;

        const result = await dbConnection.query(query, [user_id, tokenString]);

        if (!result) {
            throw new Error('Database query failed');
        }

        return result.rows[0] || null;
    }

    //Token Validation - needs updating
    async invalidateToken(user_id, tokenstring) {
        const query = `
            UPDATE User_Tokens
            SET revoked = true
            WHERE user_id = $1
                AND refresh_token = $2
                AND revoked = false 
            RETURNING token_id, revoked;
        `;

        const result = await dbConnection.query(query, [user_id, tokenstring]);

        if (!result) {
            throw new Error('Datbase error');
        }

        if (result.rows.length === 0) {
            return { success: false, message: "Token was already invalid or does not exist." };
        }

        // Success! The token is now permanently disabled.
        return { success: true, tokenId: result.rows[0].token_id };
    }
}


export default new tokenRepository();