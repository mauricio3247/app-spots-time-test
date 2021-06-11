import {  Card, Tooltip } from "antd"
import Text from "antd/lib/typography/Text"

type Data = {
    authUserId:string
    time: string,
    taken: number,
    total: number,
    items: any[]
}

export const ItemBoard = ({ time, taken, total, items, authUserId }: Data) => {
    const userId = authUserId
    const owned = items.find(i => i=== userId) !== undefined 
    const takeSpot = async () => {
        try {
            if (userId) {
                await (await fetch('/api/spots', {
                    method: 'POST',
                    body: JSON.stringify({
                        newTime: owned ? '': time,
                        userId: userId
                    })
                })).json()
            } else {
                return
            }

        } catch (error) {

        }
    }

    const title =  (owned ? <Text type="danger"> {time.toUpperCase()} SELECTED </Text>: time.toUpperCase() )
    const notAvailable = taken >= total ? <><Text type="danger">Not Available</Text><br/></> : <></>
    return <>
        <Tooltip title="tap to take or let it">
            <Card onClick={takeSpot} 
            hoverable={true}
            style={{ textAlign:'center', width: '100%' , height:'160px' }} 
            title={title}>
                {notAvailable}
                {`taken: ${taken}`}
                <br />
                {`total: ${total}`}
                <br />
            </Card>
        </Tooltip>
    </>
}