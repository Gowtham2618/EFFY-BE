const StatusCodes = require('../../constants/StatuCodes');
const Responses = require('../../helpers/Responses');

class CompaniesController {
    companyCreated = (req, res) => {
        try {
            let responseStatus = req?.body?.companiesResponse;
            console.log("responseStatus", responseStatus)
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_CREATED, responseStatus?.data, "Company Created Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Create Company !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    companyList = (req, res) => {
        try {
            let responseStatus = req?.body?.companiesList;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Company Fetched Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Fetch Company !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    companiesLists = (req, res) => {
        try {
            let responseStatus = req?.body?.companiesLists;
            let data = responseStatus;
            console.log("responseStatus", data)
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, data, "Companies Fetched Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Fetch Companies !");
            }
        }

        catch (error) {
            console.log("ERROR", error)
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    companyUpdated = (req, res) => {
        try {
            let responseStatus = req?.body?.updatedObj;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Company Details Updated Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Update Company Details !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    removeUsers = (req, res) => {
        try {
            let responseStatus = req?.body?.removedUsers;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Users Removed Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Removed Users !");
            }
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    mappedUsers = (req, res) => {
        try {
            let responseStatus = req?.body?.mappedUsers;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Users Mapped Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Map Users !");
            }
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    deletedCompanies = (req, res) => {
        try {
            let responseStatus = req?.body?.deleteCompany;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Companies  Deleted Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Delete Companies !");
            }
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }
}

const companiesCtrl = new CompaniesController;
module.exports = companiesCtrl;