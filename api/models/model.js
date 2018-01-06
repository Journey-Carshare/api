var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {
        type: String,
        required: "You are missing the email"
    },
    name: {
        first: {
            type: String,
            required: "You are missing the first name"
        },
        last: {
            type: String,
            required: "You are missing the last name"
        }
    },
    password: {
        hash: {
            type: String,
            required: "You are missing the password"
        },
        zxcvbnClient: {
            type: Number
        },
        zxcvbnServer: {
            type: Number
        }
    },
    address: {
        home: {
            postcode: {
                type: String,
                required: "You are missing the postcode"
            },
            longitude: {
                type: String
            },
            latitude: {
                type: String
            }
        },
        work: {
            location: {
                type: String,
                enum: ["Reading", "Templecombe"],
                required: "You are missing your work location"
            },
            jobRole: {
                type: String
            }
        }
    },
    phoneNo: {
        type: String,
        required: "You are missing the phone_no"
    },
    dates: {
        createdDate: {
            type: Date,
            default: Date.now
        },
        lastLogin: {
            type: Date,
            default: Date.now
        }
    },
    account: {
        status: {
            type: [{
                type: String,
                enum: ["pending", "activated", "deactivated"]
            }],
            default: ["pending"]
        },
        rank: {
            type: [{
                type: String,
                enum: ["standard", "admin"]
            }],
            default: ["standard"]
        }
    },
    vehicleId: {
        type: Number
    },
    profileImage: {
        type: String
    }
});

module.exports = mongoose.model("Users", UsersSchema);

var LoggingSchema = new Schema({
    api_call: {
        type: String,
        required: "You are missing the call"
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    ip: {
        type: String
    },
    guid: {
        type: String
    },
    used: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Logs", LoggingSchema);

var GUIDSchema = new Schema({
    rand64: {
        type: String,
        required: "You are missing id"
    },
    hash: {
        type: String,
        required: "you are missing hash"
    },
    ip: {
        type: String
    },
    "acceptEncoding": {
        type: String
    },
    "acceptLanguage": {
        type: String
    },
    "userAgent": {
        type: String
    },
    timeOpened: {
        type: Date
    },
    timezone: {
        type: Date
    }
});

module.exports = mongoose.model("Guids", GUIDSchema);
