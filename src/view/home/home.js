import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner, Card, Badge } from 'reactstrap'
import { Video, Image, Music } from 'react-feather'
import Dropzone from 'react-dropzone'
import FamousCardView from './FamousCardView'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFamousPosts } from '../../redux/action/homeAction'
import firebase from '../../firebase/Firebase'
import UploadMedia from './UploadMedia'
import { VIDEO_MEDIA, IMAGE_MEDIA } from '../../common/util'

const Home = () => {
  const {famousPosts, lastItem, hasMoreItems} = useSelector(state => ({
    famousPost: state.home.famousPost,
    lastItem: state.home.lastItem,
    hasMoreItems: state.home.hasMoreItems
  }))
  const [selectedMediaType, setSelectedMediaType] = useState('')
  const [selectedMediaFile, setSelectedMediaFile] = useState('')
  const [showSelectedMediaCard, setShowSelectedMediaCard] = useState(false)
  let dispatch = useDispatch()

   const updateItemDesign = () => {
     var items = []
     famousPosts.map((item,index) => {
       items.push(
         <FamousCardView data={item}/>
       )
     })
     return items
   }

   const loadMoreItems = (page) => {
     console.log("page "+page)
     dispatch(fetchFamousPosts(lastItem))
   }

  const uploadTask = () => {
       let time = new Date().getTime();
       console.log(selectedMediaFile);
       const storage = firebase.storage();
       const uploadTask = storage.ref(`${selectedMediaType}/${time + selectedMediaFile.name}`).put(selectedMediaFile);
       uploadTask.on(
         "state_changed",
         (snapshot) => {},
         (error) => {
           console.log(error);
           
         },
         () => {
           storage
             .ref(selectedMediaType)
             .child(time + selectedMediaFile.name)
             .getDownloadURL()
             .then((url) => {
               console.log(url);
               
             })
             .catch((err) => {
              
               console.log(err);
             });
         }
       );
    };

    const closeSelectedMediaCard = () => {
      setShowSelectedMediaCard(false)
    }

    return (
      <div>
        <Card>
          <div className="d-flex justify-content-between">
            <Dropzone onDrop={(acceptedFiles) => {
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
            <Dropzone onDrop={(acceptedFiles) => {
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
          {updateItemDesign}
        </InfiniteScroll>
        {showSelectedMediaCard && (
          <UploadMedia
          mediaType = {selectedMediaType}
          file = {selectedMediaFile}
          closeSelectedMedia = {() => closeSelectedMediaCard()}
          uploadMedia={uploadTask}
          />
        )}
      </div>
    );
}

export default Home;