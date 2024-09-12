const {Schema, model} = require("mongoose");

const userSchema = new Schema({ 
 username: {
    type: String,
    unique: true,
    required: true,
    trim: true
},
email: {
    type: String,
    unique: true,
    required: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  "Your email was wrong, please enter a valid email address"]
},
thoughts: [
    {
       type: Schema.Types.ObjectId, 
       ref: "Thoughts"
    },
],
friends:[
    {
        type: Schema.Types.ObjectId,
            ref: "Users"
        },
    ]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
userSchema.virtual("friendCount").get(function () { 
    return this.friends.length;
});

const Users = model("Users", userSchema);
module.exports = Users;