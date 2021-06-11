import { Row, Col } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import { ItemBoard } from './ItemBoard'

type Data = {
    time: string,
    taken: number,
    total: number,
    items: any[]
}


export const Board = ({ dataTime, authUserId }: { dataTime: Data[], authUserId: string }) => {

    return <>

        <Content style={{ padding: '1em' }}>
            <Row>
                {dataTime.map(item =><Col style={{ padding: '.2em' }} xs={12} sm={12} md={8} lg={4} xl={4} key={item.time}><ItemBoard {...item} authUserId={authUserId}  ></ItemBoard></Col>)}
            </Row>
        </Content>



    </>
}