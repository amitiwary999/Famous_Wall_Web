import React from 'react'
import imgPic from '../../img/IMG_20190907_224201.jpg'
import { Col, Card } from 'reactstrap';

const FamousCardView = (props) => {
    return (
      <div className="container">
        {/* {console.log("data in card "+JSON.stringify(props))} */}
        <Col md={6} className="mx-auto">
        <Card>
            <div className="row">

            </div>
            <div>
            <img src={imgPic} style={{width: 'auto', height: 'auto', maxHeight: '640px', minWidth: '120px'}} />
            </div>
            
            <div className="row">
                
            </div>
          </Card>
        </Col>
      </div>
    );
}

export default FamousCardView;