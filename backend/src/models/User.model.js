import {Schema} from "mongoose";
import mongoose from "mongoose";

var UserSchema = new Schema({
    username: String,
    password: String,
    team: String
});
export default mongoose.model("User", UserSchema);

