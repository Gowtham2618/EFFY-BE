const StatusCodes = require('../../constants/StatuCodes');
const Responses = require('../../helpers/Responses');

const userModel = require('./UserModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class UserQuery {
    checkUser = async (req, res, next) => {
        try {
            let userEmail = req?.body?.email;
            let userResponse = await userModel.findOne({ email: userEmail, isActive: true }).lean();
            if (userResponse) {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "User Already Exists !");
            }
            else next();
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    userCreate = async (req, res, next) => {
        try {
            let insertObj = req?.body ?? {};
            let userResponse = await userModel.create({ ...insertObj });
            if (userResponse) {
                req.body['insertedObj'] = {
                    success: true,
                    data: userResponse
                }
            }
            next();
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    migrateUsers = async (req, res, next) => {
        try {
            let updateObj = req?.body ?? {};
            let userResponse = await userModel.updateMany(
                {
                    _id: { $in: updateObj.selectedUser }
                },
                {
                    $set: {
                        companyId: updateObj.companyId
                    }
                },
            );
            if (userResponse.acknowledged === true) {
                req.body['updatedObj'] = {
                    success: true,
                    data: {}
                }
            }     
            next();       
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    getUserbyId = async (req, res, next) => {
        try {
            let userId = req?.params?.userId;

            if (ObjectId.isValid(userId)) {
                let getResponse = await userModel.findOne({ _id: new ObjectId(userId) }).lean();
                if (getResponse) {
                    req.body['userResponse'] = {
                        success: true,
                        data: getResponse
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "UserId is not valid !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    getUsers = async (req, res, next) => {
        try {
            let companyId = req?.query?.companyId;
            let matchCondition = {
                isActive: true
            }
            if (companyId) {
                matchCondition = {
                    ...matchCondition,
                    companyId: new mongoose.Types.ObjectId(companyId)
                }
            }
            let userLists = await userModel.aggregate([
                {
                    $match: { ...matchCondition }
                }
            ]);

            if (userLists?.length > 0) {
                req.body['usersList'] = {
                    success: true,
                    data: userLists
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_NOTFOUND, {}, "Users Not Found !");
            }
        }

        catch (error) {
            console.log("ER", error)
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    updateUserData = async (req, res, next) => {
        try {
            let userId = req?.params?.userId, updateObj = req?.body;
            console.log("updateObj", updateObj)
            if (ObjectId.isValid(userId)) {
                let updateUser = await userModel.findByIdAndUpdate(
                    {
                        _id: new ObjectId(userId)
                    },
                    {
                        $set: { ...updateObj }
                    }
                );

                if (updateUser) {
                    req.body['updatedUser'] = {
                        success: true,
                        data: updateUser
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "UserId is not valid !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    deactiveUser = async (req, res, next) => {
        try {
            let userId = req?.params?.userId;

            if (ObjectId.isValid(userId)) {
                let deactiveUser = await userModel.findByIdAndUpdate(
                    {
                        _id: new ObjectId(userId)
                    },
                    {
                        $set: { isActive: false }
                    }
                );

                if (deactiveUser) {
                    req.body['deactivedUser'] = {
                        success: true,
                        data: deactiveUser
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "UserId is not valid !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    deleteUserData = async (req, res, next) => {
        try {
            let userId = req?.params?.userId;

            if (ObjectId.isValid(userId)) {
                let deleteUser = await userModel.findByIdAndRemove({ _id: new ObjectId(userId) });

                if (deleteUser) {
                    req.body['deleteUser'] = {
                        success: true,
                        data: deleteUser
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "UserId is not valid !");
            }
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }
}

const userQuery = new UserQuery;
module.exports = userQuery;