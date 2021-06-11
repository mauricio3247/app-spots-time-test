
import firestore from '../../helpers/server/firestore.server'
const LIMIT = 8

export type DataTimeBoard = {
    time: string,
    taken: number,
    total: number,
    items: string[]
}



export const generateSpotBoard = async ():Promise<DataTimeBoard[]> => {
    try {
        let counter = -1
        const arrBase = Array.from(Array(25).keys())
        const dataBoard = await Promise.all (arrBase.map( async (item, index ) => {
            //console.log('item', item, index)
            const minutes = index % 2 === 0 ? '00': '30'
            counter =  index % 2 === 0 ? counter + 1 : counter
            const hour = 8 + counter 
            const normalHour = hour > 12 ? hour - 12 : hour
            const normalHourFormated = normalHour < 10 ? `0${normalHour}` : `${normalHour}`
            const format = hour >= 12 ? 'pm' : 'am' 
            const timeFormated = `${normalHourFormated}:${minutes} ${format}`
            const response = await firestore.collection('moto_register').where("time", "==", timeFormated).get()
            return {
                time: `${normalHourFormated}:${minutes} ${format}`,
                taken: response.docs.length,
                total: LIMIT,
                items: response.docs.map((item:any) => item.data().user_id)
            }
        }))
        //await firestore.collection('dashboard').
        await Promise.all (dataBoard.map(async (item, index )=> {
            await firestore.collection('dashboard').doc(`${index}-${item.time}`).set(item)
        }))
        


        return dataBoard
    } catch (error) {
        throw error
    }
}