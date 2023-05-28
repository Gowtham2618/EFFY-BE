const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companiesSchema = new Schema(
    {
        companyName: {
            type: String
        },
        companyAddress: {
            type: String
        },
        location: {
            type: {
                type: String,
                enum: ["Point"], // 'location.type' must be 'Point'
                required: true,
            },
            coordinates: {
                type: [Number], // [longitude,latitude]
                required: true,
            },
        },
        // mappedUsers: [{
        //     type: Array
        // }]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('companies', companiesSchema);

