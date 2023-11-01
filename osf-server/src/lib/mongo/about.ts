import { ObjectId } from 'mongodb'
import clientPromise from './mongodb'

export const getAbout = async () => {
    const client = await clientPromise;

    try {
        const about = await client
        .db('OFS')
        .collection('About')
        .findOne()
        
        console.log(about)
        return {about : about}
    } catch (error) {
        return {error : 'Could not fetch About!'}
    }
}