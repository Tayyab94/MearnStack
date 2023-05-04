const mongoose = require("mongoose");
const { MONGODB_CONNECTIONSTRING } = require("../config");

const connectionString = MONGODB_CONNECTIONSTRING


const dbConnect = async () => {
    try {

        mongoose.set("strictQuery", false);
        const con = await mongoose.connect(connectionString);

        console.log(`Database Connected to hosst :${con.connection.host}`);
    } catch (error) {
        console.error(`Error :${error}`)
    }
}


module.exports = dbConnect;