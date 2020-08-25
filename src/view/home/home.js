import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Spinner } from 'reactstrap'

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
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={<Spinner />}>
          {items}
        </InfiniteScroll>
      </div>
    );
}

export default Home;