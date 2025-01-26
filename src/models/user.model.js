import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
    },
    {
        timestamps: true
    }
)

// Use a pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
    // Check if the password field is modified or if it's a new document
    if (!this.isModified("password")) return next();

    // Hash the password using bcrypt
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare the provided password with the hashed password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// Create the User model
const User = mongoose.model("User", userSchema);
export default User;