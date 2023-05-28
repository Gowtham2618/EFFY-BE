const StatusCodes = require('../../constants/StatuCodes');
const Responses = require('../../helpers/Responses');

const companiesModel = require('./CompaniesModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class CompanyQueries {
    isAlreadyExist = async (req, res, next) => {
        try {
            let companyName = req?.body?.companyName;
            let companyResponse = await companiesModel.findOne({ companyName: companyName }).lean();

            if (companyResponse) {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Company Already Exist !");
            }
            else next();
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    createCompany = async (req, res, next) => {
        try {
            let insertObj = req?.body ?? {};
            let insertedResponse = await companiesModel.create({ ...insertObj });
            if (insertedResponse) {
                req.body['companiesResponse'] = {
                    success: true,
                    data: insertedResponse
                }
            }
            next();
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    getCompanybyId = async (req, res, next) => {
        try {
            let companyId = req?.params?.companyId;

            if (ObjectId.isValid(companyId)) {
                let getResponse = await companiesModel.findOne({ _id: new ObjectId(companyId) }).lean();
                if (getResponse) {
                    req.body['companiesList'] = {
                        success: true,
                        data: getResponse
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "CompanyId is not valid !");
            }
        }

        catch (error) {
            console.log("ER", error)
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    getCompanies = async (req, res, next) => {
        try {
            let page = req.query.page || 1;
            let pageSize = req.query.pageSize || 10;
            console.log("PAGE",pageSize,page)
            let skip = parseInt(page - 1) * pageSize;
            // let companiesLists = await companiesModel.aggregate([
            //     {
            //         $facet: {
            //             resData: [{ $skip: skip }, { $limit: Number(pageSize) }],
            //             count: [{ $count: "totalCount" }]
            //         }
            //     }
            // ]).allowDiskUse(true);
            let companiesLists = await companiesModel.find({})
            if (companiesLists?.length > 0) {
                // let totalPages = Math.ceil(companiesLists[0].count[0].totalCount / pageSize);
                req.body['companiesLists'] = {
                    success: true,
                    // data: companiesLists[0]?.resData ?? [],
                    data: companiesLists ||  [],
                    // totalPages: totalPages || 0,
                    // totalRecords: companiesLists[0]?.count[0]?.totalCount ?? 0
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_NOTFOUND, {}, "Companies Not Found !");
            }
        }

        catch (error) {
            console.log("ERROR", error)
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    updateCompany = async (req, res, next) => {
        try {
            let companyId = req?.params?.companyId, updateObj = req?.body;
            console.log("updateObj",req.body)
            if (ObjectId.isValid(companyId)) {
                let updateUser = await companiesModel.findByIdAndUpdate(
                    {
                        _id: new ObjectId(companyId)
                    },
                    {
                        $set: { ...updateObj }
                    }
                );
                if (updateUser) {
                    req.body['updatedObj'] = {
                        success: true,
                        data: updateUser
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "CompanyId is not valid !");
            }
        }

        catch (error) {
            console.log("ERROR",error)
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    removeUserFromCompany = async (req, res, next) => {
        try {
            let companyId = req?.params?.companyId, usersIds = req?.body?.usersIds ?? [];
            if (ObjectId.isValid(companyId)) {
                let userRemoved = await companiesModel.findByIdAndUpdate(
                    {
                        _id: new ObjectId(companyId)
                    },
                    {
                        $pull: {
                            mappedUsers: { $in: [...usersIds] }
                        }
                    }
                );

                if (userRemoved) {
                    req.body['removedUsers'] = {
                        success: true,
                        data: userRemoved
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "CompanyId is not valid !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    usersMapped = async (req, res, next) => {
        try {
            let companyId = req?.params?.companyId, usersIds = req?.body?.usersIds ?? [];
            if (ObjectId.isValid(companyId)) {
                let userMapped = await companiesModel.findByIdAndUpdate(
                    {
                        _id: new ObjectId(companyId)
                    },
                    {
                        $push: {
                            mappedUsers: [...usersIds]
                        }
                    }
                );
                if (userMapped) {
                    req.body['mappedUsers'] = {
                        success: true,
                        data: userMapped
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "CompanyId is not valid !");
            }
        }

        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }

    deleteCompanies = async (req, res, next) => {
        try {
            let companyId = req?.params?.companyId;
            if (ObjectId.isValid(companyId)) {
                let companyDeleted = await companiesModel.findByIdAndRemove({ _id: new ObjectId(companyId) });

                if (companyDeleted) {
                    req.body['deleteCompany'] = {
                        success: true,
                        data: companyDeleted
                    }
                }
                next();
            }
            else {
                Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "CompanyId is not valid !");
            }
        }
        catch (error) {
            Responses.error(req, res, StatusCodes.HTTP_INTERNAL, {}, "Internal Server Error !");
        }
    }
}


const companyQueries = new CompanyQueries;

module.exports = companyQueries;