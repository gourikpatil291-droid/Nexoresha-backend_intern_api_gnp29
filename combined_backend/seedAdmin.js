const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/admin.model");

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("MongoDB Connected for seeding...");

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email: "admin@nexoresha.com" });
        if (adminExists) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        // Create the admin
        await Admin.create({
            name: "Super Admin",
            email: "admin@nexoresha.com",
            password: "adminpassword123" // The model should automatically hash this if a pre-save hook exists, otherwise we'll see!
        });

        console.log("Success! Admin user created.");
        console.log("Email: admin@nexoresha.com");
        console.log("Password: adminpassword123");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
