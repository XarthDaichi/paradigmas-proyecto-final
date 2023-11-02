import { ObjectId } from 'mongodb';

export type Script = {
    _id?: ObjectId,
    name: string,
    text: string
}

export type TranspiledScript = {
    timestamp: string,
    text: string,
    name: string,
    id?: ObjectId
}

export type Keyword = {
    _id?: ObjectId,
    keyword: string
}