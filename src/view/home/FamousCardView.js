import React, { useContext } from 'react'
import imgPic from '../../img/IMG_20190907_224201.jpg'
import { Col, Card, CardBody } from 'reactstrap';
import { IMAGE_MEDIA, VIDEO_MEDIA, MUSIC_MEDIA } from '../../common/util';
import { Heart } from 'react-feather';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../firebase/Auth';
import { likeOrUnlikePost } from '../../redux/action/homeAction';

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

                <div
                  className="row justify-content-center p-2"
                  onClick={updateLikePost}
                >
                  <Heart
                    style={{
                      fill: heartIconColor,
                      color: heartIconBorderColor,
                    }}
                  />
                </div>
              </Col>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
}

export default FamousCardView;