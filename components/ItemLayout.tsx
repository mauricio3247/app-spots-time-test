import { Col, Row } from "antd";

export const ItemLayout = ({children}:{children: JSX.Element}) => {
    const layout = {
        xs: {span: 24, offset: 0}, lg: {span: 12, offset: 6} ,
     };

    return <>
      <Row >
        <Col 
        style={{padding: '.2em'}}
        {...layout}>
            {children}
        </Col>
      </Row>
    </>
}