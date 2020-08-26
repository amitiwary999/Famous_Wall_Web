import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner, Card, Badge } from 'reactstrap'
import { Video, Image, Music } from 'react-feather'

const Home = () => {
    const [famousPosts, setFamousPosts] = useState([])
    const [hasMoreItems, setHasMoreItems] = useState(true)
    const [nextHref, setNextHref] = useState(null)
    const [items, setItems] = useState([])

   useEffect(() => {
       famousPosts.map((famousPost, index) => {
           setItems([...items, famousPost])
       })
   }, [famousPosts])
   
    return (
      <div>
        <Card>
          <div className="d-flex justify-content-between">
            <Badge pill color="info" className="mr-1 mb-1">
              <Video size={16} className="mr-2" />
              Video
            </Badge>
            <Badge pill color="info" className="mr-1 mb-1">
              <Image size={16} className="mr-2" />
              Image
            </Badge>
            <Badge pill color="info" className="mr-1 mb-1">
              <Music size={16} className="mr-2" />
              Audio
            </Badge>
          </div>
        </Card>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={<Spinner />}
        >
          {items}
        </InfiniteScroll>
      </div>
    );
}

export default Home;