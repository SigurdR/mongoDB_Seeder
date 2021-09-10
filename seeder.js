import dotenv from 'dotenv'
import faker from 'faker'
import mongoose from 'mongoose';
import User from './models/user.model.js'
import connectDB from './db.js'
import fs from 'fs';

dotenv.config()

async function seedDB() {
    try {
        
        let userData = []

        for (let i = 0; i < 20; i++) {

            const firstname = faker.name.firstName()
            const lastname = faker.name.lastName()

            let user = {
                name: firstname + ' ' + lastname,
                email: faker.internet.email(firstname, lastname),
                password: faker.random.alphaNumeric(6),
                updated: Date.now(),
                created: Date.now()
            }
            
            userData.push(user)
        }

        fs.writeFileSync('./logger.json', JSON.stringify(userData, null, 2), function(err) {
            if (err) return console.log(err)
        })

        await connectDB()
        
        await User.create(userData)

    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();




