const StatusCodes = require('../../constants/StatuCodes');
const Responses = require('../../helpers/Responses');

class UserController {
    createUser = (req, res) => {
        try {
            let responseStatus = req?.body?.insertedObj;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_CREATED, responseStatus?.data, "User Created Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Create User !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    usersMigrate = (req, res) => {
        try {
            let responseStatus = req?.body?.updatedObj;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_CREATED, responseStatus?.data, "User Migrated Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed to Migrate Users !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    userList = (req, res) => {
        try {
            let responseStatus = req?.body?.userResponse;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "User Fetched Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Fetch User !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    usersLists = (req, res) => {
        try {
            console.log("#########")
            let responseStatus = req?.body?.usersList;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Users Fetched Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Fetch Users !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    updateUser = (req, res) => {
        try {
            let responseStatus = req?.body?.updatedUser;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "Users Details Updated Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Update Users Details !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    userDeactive = (req, res) => {
        try {
            let responseStatus = req?.body?.deactivedUser;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, responseStatus?.data, "User Deactivated Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Deactive User !");
            }
        }

        catch (error) {
            console.log("ERR", error)
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    deleteUser = (req, res) => {
        try {
            let responseStatus = req?.body?.deleteUser;
            if (responseStatus?.success) {
                Responses.success(req, res, StatusCodes.HTTP_OK, {}, "Users Delete Successfully !");
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Failed To Delete Users !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }
}

const userctrl = new UserController();

module.exports = userctrl;