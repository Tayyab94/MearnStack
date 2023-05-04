const JWTService = require("../services/jwtService");
const User = require("../models/user");
const UserDTO = require("../DTOs/user")

const auth = async (req, res, next) => {
    try {
        // 1 Refresh Access token 
        const { accessToken, refreshToken } = req.cookies;
        if (!accessToken || !refreshToken) {
            const error = {
                status: 401,
                message: "UnAuthorized"
            }

            return next(error);
        }
    } catch (error) {
        return next(error)
    }

    let _id;

    try {
        const { _id } = JWTService.verifyAccessToken(accessToken)._id;

    } catch (error) {
        return next(error);
    }

    let user;
    try {
        user = await User.findOne({ _id: _id });

    } catch (error) {
        return next(error);
    }

    const userDto = new UserDTO(user);
    req.user = userDto;
    next();

}

module.exports = auth