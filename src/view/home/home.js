import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner, Card, Badge } from 'reactstrap'
import { Video, Image, Music } from 'react-feather'
import Dropzone from 'react-dropzone'
import FamousCardView from './FamousCardView'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import UploadMedia from './UploadMedia'
import { VIDEO_MEDIA, IMAGE_MEDIA, authToken, getHash } from '../../common/util'
import { fetchFamousPosts } from '../../redux/action/homeAction'

const Home = () => {
  const {famousPosts, lastItem, hasMoreItems} = useSelector(state => ({
    famousPosts: state.home.famousPosts,
    lastItem: state.home.lastItem,
    hasMoreItems: state.home.hasMoreItems
  }))
  const [selectedMediaType, setSelectedMediaType] = useState('')
  const [selectedMediaFile, setSelectedMediaFile] = useState('')
  const [showSelectedMediaCard, setShowSelectedMediaCard] = useState(false)
  let dispatch = useDispatch()

   const loadMoreItems = (page) => {
     console.log("page "+page)
     dispatch(fetchFamousPosts(lastItem))
   }

    const closeSelectedMediaCard = () => {
      setShowSelectedMediaCard(false)
    }

    return (
      <div>
        <Card>
          <div className="d-flex justify-content-between">
            <Dropzone accept='video/*' onDrop={(acceptedFiles) => {
              console.log(acceptedFiles)
              setSelectedMediaFile(acceptedFiles[0])
              setSelectedMediaType(VIDEO_MEDIA)
              setShowSelectedMediaCard(true)
            }}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
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
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Badge pill color="info" className="mr-1 mb-1">
                      <Image size={16} className="mr-2" />
                      Image
                    </Badge>
                  </div>
                </section>
              )}
            </Dropzone>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
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
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreItems}
          hasMore={hasMoreItems}
          loader={<Spinner />}
        >
          {famousPosts.map((item, index) => 
            <FamousCardView data={item} />
          )}
        </InfiniteScroll>
        {showSelectedMediaCard && (
          <UploadMedia
          mediaType = {selectedMediaType}
          file = {selectedMediaFile}
         closeSelectedMedia = {() => closeSelectedMediaCard()}
          />
        )}
      </div>
    );
}

export default Home;