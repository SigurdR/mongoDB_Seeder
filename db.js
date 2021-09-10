import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`)

        var myPromise = () => {
            return new Promise((resolve, reject) => {
                 mongoose.connection.db.listCollections({name: process.env.COLL_NAME})
                    .next(function(err, collinfo) {
                        if (collinfo) {
                            mongoose.connection.db.dropCollection(
                                process.env.COLL_NAME,
                                function(err, result) {
                                    err
                                    ? reject (err)
                                    : resolve(result)
                                })
                        }
                    })
            })
        }

        var result = await myPromise()
       
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB