import type { NextApiRequest, NextApiResponse } from 'next'
import { authRequiredFromApiRequest } from '../../helpers/server/auth.required'
import {generateSpotBoard, DataTimeBoard} from '../../services/server/generate.spot.borad'
import { takeSpot } from '../../services/server/take.spot'

const requestGet = async (req: NextApiRequest, res: NextApiResponse<DataTimeBoard[] | {error: string}>) => {
    try {
        const data = await generateSpotBoard()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({error: 'Error to fetch Board Time'})
    }
}

const requestPost = async (req: NextApiRequest, res: NextApiResponse<DataTimeBoard[] | {error: string}>) => {
    try {
        const user = await authRequiredFromApiRequest(req, res)
        if(user=== undefined){
            return;
        }      
        const {userId, newTime} = JSON.parse(req.body)
        await takeSpot(userId, newTime)
        const data = await generateSpotBoard()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({error: 'Error to fetch Board Time'})
    }
} 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if(req.method === 'GET') { 
            return requestGet(req, res)
        }else if(req.method === 'POST') { 
            return requestPost(req, res)
        }else {
            return res.status(404).end()
        }
    } catch (error) {
        if(error.statusCode) {
            return res.status(error.statusCode).json({error: error.message})
        } else {
            return res.status(500).json({error: 'Internal Error'})
        }
    }



}
