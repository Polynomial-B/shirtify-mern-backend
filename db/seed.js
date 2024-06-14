// Show page data

import Shirt from "../models/shirt.js";
import User from "../models/user.js";
import { connectToDb, truncateDb, disconnectDb } from './helpers.js'
import seedData from './seedData.js'


async function seed() {
    // try {
      await connectToDb()
      console.log('Database Connected 👚👕')
  
      await truncateDb()
      console.log('Database Dropped 👚👕')
  
      const adminUser = await User.create({
        username: 'admin',
        email: 'admin@email.com',
        password: 'password',
        isAdmin: true,
      })
      
      console.log(`${adminUser.username} user created 🧤`)
  
      const shirtsWithCreatedByAdmin = seedData.map(shirt => {
        shirt.createdBy = adminUser
        return shirt
      })


      const shirts = await Shirt.create(shirtsWithCreatedByAdmin)
  
      console.log(`${shirts.length} shirts added to Database!`)
  
    // } catch (err) {
    //   console.log('Something went wrong 🙈')
    //   console.log(err)
    // }
  
    await disconnectDb()
    console.log('Disconnecting 👋')
  }
  
  seed()

