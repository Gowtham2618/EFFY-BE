const StatusCodes = require('../../constants/StatuCodes');
const Responses = require('../../helpers/Responses');

function validateCompanyObject(req, res, next) {
    try {
        let companyData = req?.body ?? null;
        if (!companyData.hasOwnProperty('companyName')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Company Name is Required !");
        }
        else if (!companyData.hasOwnProperty('companyAddress')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Company Address is Required !");
        }
        else if (!companyData.hasOwnProperty('location')) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Location Co-ordinates is Required !");
        }
        else next();
    }

    catch (error) {
        res.status(StatusCodes.HTTP_INTERNAL).json({ status: StatusCodes.HTTP_INTERNAL, message: "Internal Server Error !" });
    }
}

module.exports = { validateCompanyObject }