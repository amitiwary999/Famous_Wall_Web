import React from 'react'
import imgPic from '../../img/IMG_20190907_224201.jpg'
import { Col, Card } from 'reactstrap';
import { IMAGE_MEDIA, VIDEO_MEDIA, MUSIC_MEDIA } from '../../common/util';
import moment from 'moment';

const FamousCardView = (props) => {
  let data = props.data;
  let mimeType = data.mimeType;
  let mediaUrl = data.mediaUrl;
  let desc = data.description;
  let userDp = data.userDp;
  let userName = data.userName;
  let date = data.date;
  let mediaTYpe = IMAGE_MEDIA
  if(mimeType.includes(IMAGE_MEDIA)){
    mediaTYpe = IMAGE_MEDIA
  }else if(mimeType.includes(VIDEO_MEDIA)){
    mediaTYpe = VIDEO_MEDIA
  }else if(mimeType.includes(MUSIC_MEDIA)){
    mediaTYpe = MUSIC_MEDIA
  }
    return (
      <div className="container my-2">
        {console.log("data in card " + JSON.stringify(props))}
        <Col md={6} className="mx-auto">
          <Card>
            <div className="row ml-3 mt-2">
              <img
                src={userDp}
                className="rounded-sm mx-2 rounded-lg"
                style={{ height: "36px", width: "36px" }}
              />
              <div className="float-left ">
                <p className="my-auto font-weight-bold">{userName}</p>
                <p>{moment(date).fromNow()}</p>
              </div>
            </div>
            <div className="my-2">
              {mediaTYpe == IMAGE_MEDIA && (
                <img
                  src={mediaUrl}
                  className="rounded-sm mx-2 rounded-lg"
                  style={{ height: "auto", maxHeight: "460px" }}
                />
              )}

              {mediaTYpe == VIDEO_MEDIA && (
                <video
                  src={mediaUrl}
                  style={{ maxWidth: "460px", height: "auto" }}
                  controls={true}
                  autoPlay={false}
                  className="rounded-sm mx-2 rounded-lg"
                />
              )}
            </div>
            {desc && (
              <div className="mt-2 mx-2">
                <p className="float-left font-weight-bold">{desc}</p>
              </div>
            )}

            <div className="row"></div>
          </Card>
        </Col>
      </div>
    );
}

export default FamousCardView;