
const validator = require("validator");
function validation(req) {
    const {firstName,secondName,password,Email} = req.body;

    // if(!firstName || !secondName)
    // {
    //     throw new Error("Name should be enter");
    // }

    if(!validator.isEmail(Email)){
        throw new Error("Enter the correct email");
    }
}

module.exports = {validation};