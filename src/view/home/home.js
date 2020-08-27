import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner, Card, Badge } from 'reactstrap'
import { Video, Image, Music } from 'react-feather'
import Dropzone from 'react-dropzone'
import FamousCardView from './FamousCardView'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFamousPosts } from '../../redux/action/homeAction'

const Home = () => {
  const [famousPosts, lastItem, hasMoreItems] = useSelector(state => ({
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