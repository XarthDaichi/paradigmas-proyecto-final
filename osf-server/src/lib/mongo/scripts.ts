import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'
import { Script } from '@/lib/types'

export const getScript = async ( _id : ObjectId ) => {
    const client = await clientPromise;

    try {
        const script = await client
        .db('OFS')
        .collection('Scripts')
        .findOne({_id : _id})
        return {script : script}
    } catch (error) {
        return { error : 'Failed to fetch script!'}
    }
}

export const getScripts = async () => {
    const client = await clientPromise;

    try {
        const scripts = await client
        .db('OFS')
        .collection('Scripts')
        .find({})
        .toArray();
        return { scripts : scripts }
    } catch (error) {
        return { error : 'Failed to fetch scripts!' }
    }
}

export const insertScript = async (script : Script) => {
    const client = await clientPromise;
    
    try {
        const response = await client.db('OFS').collection('Scripts').insertOne(script)
        return { insertedId : response.insertedId }
    } catch (error) {
        return { error : 'Could not insert script!' }
    }
}

export const updateScript = async (script : Script) => {
    const client = await clientPromise

    try {
        const response = await client.db('OFS').collection('Scripts').replaceOne({_id : script._id}, script)
        return { modifiedCount : response.modifiedCount }
    } catch (error) {
        return { error : 'Could not update script!' }
    }
}

export const deleteScript = async (_id : ObjectId) => {
    const client = await clientPromise

    try {
        const response = await client.db('OFS').collection('Scripts').deleteOne({_id : _id})
        console.log(response)
        return {deletedCount : response.deletedCount}
    } catch (error) {
        return {error : 'Could not delete Script!'}
    }
}