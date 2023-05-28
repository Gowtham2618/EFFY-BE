const StatusCodes = require('../../constants/StatuCodes');
const Responses = require('../../helpers/Responses');

function validateUserObject(req, res, next) {
    try {
        let userData = req?.body ?? null;
        if (!userData.hasOwnProperty('firstName')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Frist Name is Required !");
        }
        else if (!userData.hasOwnProperty('lastName')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Last Name is Required !");
        }
        else if (!userData.hasOwnProperty('designation')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Designation is Required !");
        }
        else if (!userData.hasOwnProperty('email')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Email is Required !");
        }
        else if (!userData.hasOwnProperty('dob')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Date Of Birth is Required !");
        }
        else next();
    }

    catch (error) {
        res.status(StatusCodes.HTTP_INTERNAL).json({ status: StatusCodes.HTTP_INTERNAL, message: "Internal Server Error !" });
    }
}

module.exports = { validateUserObject }