class UserDTO {
    constructor(user) {
        this._id = user._id;
        this.userName = user.userName;
        this.name = user.name
    }
}

module.exports = UserDTO;