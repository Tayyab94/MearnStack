const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_ACCESS, REFRESH_TOKEN_ACCESS } = require("../config");

const RefreshToken = require("../models/token");


// const REFRESH_TOKEN_ACCESS = "1f4e002971f05f80d5b002aaceaccd4f8a9b041fb481dcbf5ee6731f5d5dc3e2e146789270863ff325213ef47b178b6e33a1f668c9e53cca052d158b0046b009";
// const ACCESS_TOKEN_ACCESS = "32da7ec61410d0cf353131bba7339fd2a292cfad93330eb7de848527d4beabc5dcf6c08d473b72c599dd5479ce534e456ad640b3acf717a48d598f18476efc31";

class JWTService {

    // // SignAccessToken
    // SignAccessToken(payload, expireTime, secret = ACCESS_TOKEN_ACCESS) {
    //     return jwt.sign(payload, secret, { expiresIn: expireTime });
    // }

    // // Sign Refresh token 

    // SignRefreshToken(payload, expireTime, secret= REFRESH_TOKEN_ACCESS)
    // {
    //     return jwt.sign(payload,secret, {expiresIn: expireTime})
    // }


    // SignAccessToken
    static SignAccessToken(payload, expireTime) {
        return jwt.sign(payload, ACCESS_TOKEN_ACCESS, { expiresIn: expireTime });
    }

    // Sign Refresh token 

    static SignRefreshToken(payload, expireTime) {
        return jwt.sign(payload, REFRESH_TOKEN_ACCESS, { expiresIn: expireTime })
    }

    // VerifyAccessToken

    static verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_TOKEN_ACCESS);
    }

    // VerifyRefreshToken
    static verifyRefreshToken(token) {
        return jwt.verify(token, REFRESH_TOKEN_ACCESS);
    }


    // Store Refresh token
    static async storeRefreshToekn(token, userId) {
        try {
            const newToken = new RefreshToken({
                token: token,
                userId: userId
            });

            await newToken.save();

        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = JWTService;