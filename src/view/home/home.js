import React, { useState, useEffect, useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner, Card, Badge, Col } from 'reactstrap'
import { Video, Image, Music } from 'react-feather'
import Dropzone from 'react-dropzone'
import FamousCardView from './FamousCardView'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import UploadMedia from './UploadMedia'
import { VIDEO_MEDIA, IMAGE_MEDIA, authToken, getHash, PENDING, SUCCESS, FAILURE } from '../../common/util'
import { fetchFamousPosts } from '../../redux/action/homeAction'
import { AuthContext } from '../../firebase/Auth'
import Login from '../login/Login'

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const {famousPosts, lastItemId, hasMoreItems, loadItemStatus} = useSelector(state => ({
    famousPosts: state.home.famousPosts,
    lastItemId: state.home.lastItemId,
    hasMoreItems: state.home.hasMoreItems,
    loadItemStatus: state.home.loadIteStatus
  }))
  const [selectedMediaType, setSelectedMediaType] = useState('')
  const [selectedMediaFile, setSelectedMediaFile] = useState('')
  const [showSelectedMediaCard, setShowSelectedMediaCard] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFamousPosts(lastItemId))
  }, [])
  //  const loadMoreItems = (page) => {
  //    console.log("page "+page)
  //    dispatch(fetchFamousPosts(lastItemId))
  //  }

  useEffect(() => {
    console.log("home posts "+JSON.stringify(famousPosts))
  },[famousPosts])

  useEffect(() => {
    if(loadItemStatus == PENDING){

    }else if(loadItemStatus == SUCCESS){

    }else if(loadItemStatus == FAILURE){
      
    }
  }, [loadItemStatus])
    const closeSelectedMediaCard = () => {
      setShowSelectedMediaCard(false)
    }

    const loadFamousCard = (item, index) => {
      console.log("item " + item['mimeType'])
       return < FamousCardView data = { item } />
    }

    const dropzoneClick = (event) => {
      console.log("dropzone "+event+" "+currentUser)
      if(!currentUser){
        event.stopPropagation()
        setShowLogin(true)
      }
    }

    const hideLogin = () => {
      setShowLogin(false);
    }

    return (
      <div>
        <Col md={6} className="mx-auto mt-2">
        <Card>
          <p className="font-weight-bold">Make yourself famous</p>
          <div className="d-flex justify-content-between pl-2 pr-2">
            <Dropzone accept='video/*' onDrop={(acceptedFiles) => {
              console.log(acceptedFiles)
              setSelectedMediaFile(acceptedFiles[0])
              setSelectedMediaType(VIDEO_MEDIA)
              setShowSelectedMediaCard(true)
            }}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div style={{ cursor: 'pointer' }} {...getRootProps({ onClick: event => dropzoneClick(event)})}>
                    <input {...getInputProps()} />
                    <Badge pill color="info" className="mr-1 mb-1">
                      <Video size={16} className="mr-2" />
                      Video
                    </Badge>
                  </div>
                </section>
              )}
            </Dropzone>
            <Dropzone accept='image/*' onDrop={(acceptedFiles) => {
              console.log(acceptedFiles)
              setSelectedMediaFile(acceptedFiles[0])
              setSelectedMediaType(IMAGE_MEDIA)
              setShowSelectedMediaCard(true)
            }}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div style={{ cursor: 'pointer' }} {...getRootProps({ onClick: event => dropzoneClick(event) })}>
                    <input {...getInputProps()} />
                    <Badge pill color="info" className="mr-1 mb-1">
                      <Image size={16} className="mr-2" />
                      Image
                    </Badge>
                  </div>
                </section>
              )}
            </Dropzone>
            <Dropzone accept='audio/*' onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div style={{ cursor: 'pointer' }} {...getRootProps({ onClick: event => dropzoneClick(event)})}>
                    <input {...getInputProps()} />
                    <Badge pill color="info" className="mr-1 mb-1">
                      <Music size={16} className="mr-2" />
                      Audio
                    </Badge>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </Card>
        </Col>
        {/* <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreItems}
          hasMore={hasMoreItems}
          loader={<Spinner />}
        > */}
          {famousPosts && famousPosts.map((item, index) => 
         loadFamousCard(item, index)
          )}
        {/* </InfiniteScroll> */}
        {showSelectedMediaCard && (
          <UploadMedia
          mediaType = {selectedMediaType}
          file = {selectedMediaFile}
         closeSelectedMedia = {() => closeSelectedMediaCard()}
          />
        )}
        {showLogin && (
          <Login closeLogin={() => hideLogin()}/>
        )}
      </div>
    );
}

export default Home;