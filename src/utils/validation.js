
const validator = require("validator");
function validation(req) {
    if("photoUrl" in req.body && !validator.isURL(req.body.photoUrl)){
        throw new Error("plz enter the photo url valid");
    }
}

module.exports = {validation};