import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner, Card, Badge } from 'reactstrap'
import { Video, Image, Music } from 'react-feather'
import Dropzone from 'react-dropzone'
import FamousCardView from './FamousCardView'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFamousPosts } from '../../redux/action/homeAction'
import firebase from '../../firebase/Firebase'

const Home = () => {
  const {famousPosts, lastItem, hasMoreItems} = useSelector(state => ({
    famousPost: state.home.famousPost,
    lastItem: state.home.lastItem,
    hasMoreItems: state.home.hasMoreItems
  }))
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

  const uploadTask = (file) => {
       let time = new Date().getTime();
       console.log(file);
       const storage = firebase.storage();
       const uploadTask = storage.ref(`video/${time + file.name}`).put(file);
       uploadTask.on(
         "state_changed",
         (snapshot) => {},
         (error) => {
           console.log(error);
           
         },
         () => {
           storage
             .ref("video")
             .child(time + file.name)
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
   
    return (
      <div>
        <Card>
          <div className="d-flex justify-content-between">
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
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
      </div>
    );
}

export default Home;