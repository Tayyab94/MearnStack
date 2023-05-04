const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const UserDTO = require("../DTOs/user");
const JWTService = require("../services/jwtService");
const RefreshToken = require("../models/token")

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const AuthController = {
    async register(req, res, next) {
        // .1 Validate the user Input
        const userRegisterSchema = Joi.object({
            userName: Joi.string().min(3).max(30).required(),
            name: Joi.string().max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required(),
            confirmPassword: Joi.ref("password")
        })

        // .2 If error in validation, return error via middleware
        const { error } = userRegisterSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // .3 if email or username already exist, return error
        const { userName, name, email, password } = req.body;

        try {
            const emailInUser = await User.exists({ email });
            const userNameInUse = await User.exists({ userName });

            if (emailInUser) {
                const error = {
                    status: 409,
                    message: "Email already Registered, user an other emial"
                }
                return next(error);
            }

            if (userNameInUse) {
                const error = {
                    status: 409,
                    message: "UserName already Registered, user an other User Name"
                }
                return next(error);
            }


        } catch (error) {
            return next(error);
        }

        // .4 Password Hash
        const hashPassword = await bcrypt.hash(password, 10);

        /* Creating a new instance of the User model with the provided user information (name, username, email,
        and hashed password) and saving it to the database. The saved user object is then returned as a
        response. */

        let user;
        let accessToken;
        let refreshToken;

        try {
            // .5 Store user into Db
            const userToRegister = new User({
                name: name,
                userName: userName,
                email: email,
                password: hashPassword
            });
            user = await userToRegister.save();

            accessToken = JWTService.SignAccessToken({ _id: user._id }, "30m");  //'30m' mean 30 minutes
            refreshToken = JWTService.SignRefreshToken({ _id: user._id }, "60m");


        } catch (error) {
            return next(error);
        }

        // Store Refresh Token to db

        JWTService.storeRefreshToekn(refreshToken, user._id);

        // send token In Cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })

        // .6 Response Send
        const userDto = new UserDTO(user);
        return res.status(201).json({ user: userDto, auth: true });
    },



    /**
     * This is a login function that validates user input, checks if the user exists in the database,
     * and compares the password with the hashed password in the database.
     * @param req - The request object represents the HTTP request that is sent by the client to the
     * server. It contains information about the request, such as the URL, headers, and body.
     * @param res - `res` is the response object that is used to send the HTTP response back to the
     * client. It contains methods like `status`, `json`, `send`, etc. that are used to set the response
     * status code, headers, and body.
     * @param next - next is a function that is called to pass control to the next middleware function
     * in the stack. It is typically used to handle errors or to move on to the next function in the
     * chain of middleware functions.
     * @returns If there is an error in validating the user input, the error object will be returned
     * using the `next()` function. If the user is not found or the password is invalid, an error object
     * will be returned using the `next()` function. If there are no errors, a JSON object containing
     * the user information will be returned with a status code of 200 using the `res.status().json()`
     */
    async login(req, res, next) {
        const userLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(passwordPattern).required()
        })

        // Validate user inout
        const { error } = userLoginSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { email, password } = req.body;

        let user;
        let accessToken;
        let refreshToken;


        try {
            user = await User.findOne({ email: email });
            if (!user) {
                const error = {
                    status: 401,
                    message: "Invalid email or password"
                };

                return next(error);
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                const error = {
                    status: 401,
                    message: "Invalid password"
                };
                return next(error);
            }

            accessToken = JWTService.SignAccessToken({ _id: user._id, userName: user.email }, "30m");

            refreshToken = JWTService.SignRefreshToken({ _id: user._id }, '60m');

        } catch (error) {
            return next(error);
        }

        // Store Refresh token into db

        JWTService.storeRefreshToekn(refreshToken, user._id);
        // send token In Cookie
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        })
        const userDto = new UserDTO(user);
        return res.status(200).json({ user: userDto, auth: true });

    },

    async logout(req, res, next) {
        // 1 Delete refresh token from DB
        const { refreshToken } = req.cookies;

        try {
            await RefreshToken.deleteOne({ token: refreshToken });
        } catch (error) {
            return next(error)
        }

        // 2 delete cookie
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        // 3 Response
        res.status(200).json({ user: null, auth: false })
    }
}

module.exports = AuthController