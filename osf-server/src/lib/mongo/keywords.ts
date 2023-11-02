import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export const getWord = async (keyword: string) => {
    const client = await clientPromise;

    try {
        const word = await client
        .db('OFS')
        .collection('Keywords')
        .findOne({keyword : keyword})
        
        return {word : word}
    } catch (error) {
        return {error : 'Word does not exist!'}
    }
}

export const getKeywords = async () => {
    const client = await clientPromise;

    try {
        const keywords = await client
        .db('OFS')
        .collection('Keywords')
        .find({})
        .toArray();
        return { keywords : keywords }
    } catch (error) {
        return { error : 'Failed to fetch keywords!' }
    }
}