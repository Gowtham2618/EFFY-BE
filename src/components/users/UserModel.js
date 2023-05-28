const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        designation: {
            type: String
        },
        dob: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        companyId: {
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', userSchema);

