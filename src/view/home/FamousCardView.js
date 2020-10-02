import React, { useContext } from 'react'
import imgPic from '../../img/IMG_20190907_224201.jpg'
import { Col, Card, CardBody, Badge, Row } from 'reactstrap';
import { IMAGE_MEDIA, VIDEO_MEDIA, MUSIC_MEDIA } from '../../common/util';
import { Heart, Video } from 'react-feather';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../firebase/Auth';
import { likeOrUnlikePost, postVideoCallRequest } from '../../redux/action/homeAction';

const FamousCardView = (props) => {
  const { currentUser } = useContext(AuthContext);

  let data = props.data;
  let mimeType = data.mimeType;
  let mediaUrl = data.mediaUrl;
  let desc = data.description;
  let userDp = data.userDp;
  let userName = data.userName;
  let date = data.date;
  let heartIconColor = data.isLiked?'red': 'white'
  let heartIconBorderColor = data.isLiked?'red':'black'
  let mediaTYpe = IMAGE_MEDIA
  if(mimeType.includes(IMAGE_MEDIA)){
    mediaTYpe = IMAGE_MEDIA
  }else if(mimeType.includes(VIDEO_MEDIA)){
    mediaTYpe = VIDEO_MEDIA
  }else if(mimeType.includes(MUSIC_MEDIA)){
    mediaTYpe = MUSIC_MEDIA
  }
  let creatorId = data.creatorId;
  let postId = data.postId;
  let pos = props.pos;
  let incr = (data.isLiked == 0)?1:0
  let dispatch  = useDispatch();

  const updateLikePost = () => {
    if(currentUser){
    currentUser.getIdToken().then(token => {
      dispatch(likeOrUnlikePost(postId, incr, pos, token))
    }).catch(error => {
      console.log(error)
    })
  }else{
    console.log("please login")
  }
  }


  const requestVideoCall = () => {
    let data = {
      inviteeId: creatorId,
      status: 0 //0 means request
    }
    currentUser.getIdToken().then(token => {
      postVideoCallRequest(token, data).then(res => {
        console.log('video call req '+res)
      }).catch(error => {
        console.log(error);
      })
    }).catch(error => {
      console.log(error);
    })
  }

    return (
      <div className="container my-2">
        {/* {console.log("data in card " + JSON.stringify(props))} */}
        <Col md={6} className="mx-auto">
          <Card>
            <CardBody>
              <Col style={{ height: "auto", maxWidth: "460px" }}>
                <div className="row ml-3 mt-2">
                  <img
                    src={userDp}
                    className="rounded-sm mx-2 rounded-lg"
                    style={{ height: "36px", width: "36px" }}
                  />
                  <div className="float-left ">
                    <p className="my-auto font-weight-bold">{userName}</p>
                    <p className="float-left" style={{ fontSize: "12px" }}>
                      {moment(date, "x").fromNow()}
                      {/**in response all is string so using x to format it */}
                    </p>
                  </div>
                </div>
                <div className="my-2">
                  {mediaTYpe == IMAGE_MEDIA && (
                    <img
                      src={mediaUrl}
                      className="rounded-sm mx-2"
                      style={{ height: "auto", maxWidth: "460px" }}
                    />
                  )}

                  {mediaTYpe == VIDEO_MEDIA && (
                    <video
                      src={mediaUrl}
                      style={{ maxWidth: "460px", height: "auto" }}
                      controls={true}
                      autoPlay={false}
                      className="rounded-sm mx-2 rounded-lg"
                      object-fit="cover"
                    />
                  )}
                </div>
                {desc && (
                  <div className="mt-2 mx-2">
                    <p className="float-left font-weight-bold">{desc}</p>
                  </div>
                )}
                <Row>
                  <div
                    className="justify-content-left p-2 my-auto"
                    onClick={updateLikePost}
                  >
                    <Heart
                      style={{
                        fill: heartIconColor,
                        color: heartIconBorderColor,
                      }}
                    />
                  </div>
                  <div
                    className="justify-content-right p-2"
                    onClick={requestVideoCall}
                  >
                    <Badge color="info" className=" mr-1 mb-1">
                      <Col className="p-2">
                        <Video size={16} />
                        <span className="font-weight-bold ml-1">
                          Request call
                        </span>
                      </Col>
                    </Badge>
                  </div>
                </Row>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
}

export default FamousCardView;