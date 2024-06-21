import Shirt from "../models/shirt.js";
import User from "../models/user.js";
import { connectToDb, truncateDb, disconnectDb } from "./helpers.js";
import seedData from "./seedData.js";
import dotenv from "dotenv";

async function seed() {
  
  try {
  await connectToDb();

  console.log("Connected to DB");

  await truncateDb();

  console.log("Database dropped");

  const adminUser = await User.create({
    username: process.env.ADMIN_USERNAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isAdmin: process.env.ADMIN_IS_ADMIN === "true",
  });

  console.log("User created");

  const shirtsWithCreatedByAdmin = seedData.map((shirt) => {
    shirt.createdBy = adminUser;
    return shirt;
    });
    
    
    const shirts = await Shirt.create(shirtsWithCreatedByAdmin);
    console.log("Shirt data created");
  } catch (err) {
    console.log("Error...");
    console.log(err);
  }

  await disconnectDb();
  console.log("Database update completed. Connection dropped.");
}

seed();
