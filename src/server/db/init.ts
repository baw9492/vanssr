import {MongoClient} from 'mongodb'

const uri = process.env.MONGOURI ?? 'mongodb://localhost:27017'
const client = new MongoClient(uri)
const database = client.db('temp')
export const essaylist = database.collection<essay>('essay')
