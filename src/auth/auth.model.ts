import mongoose from "mongoose";

const authedUsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const AuthedUsers = mongoose.model("authedUsers", authedUsersSchema);

export default AuthedUsers;