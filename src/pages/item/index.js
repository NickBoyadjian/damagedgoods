import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import AliceCarousel from 'react-alice-carousel';
import './style.scss'

const url = 'http://localhost:1337'

const GetItem = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      cost
      front_image { formats }
    }
  }
`;

export default function Index() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GetItem, {
   variables: { id }, 
  });

  if (loading) 
    return <>Loading...</>

  if (error) 
    return <>Error Loading Data</>

  if (data) {
    const handleOnDragStart = (e) => e.preventDefault() 
    return (
      <div className='container item-container'>
        <div className='columns'>
          <div className='column'>
            <img src={"http://localhost:1337" + data.item.front_image.formats.large.url} />
          </div>
          <div className='column'>
            <h1 className='title'>{data.item.name}</h1>
            <h2 className='title-2'>${data.item.cost}</h2>
            <p>{data.item.description}</p>
          </div>
        </div>
        
        <div className='image-gallery'>
          <AliceCarousel mouseTrackingEnabled autoplay>
            <img src={"http://localhost:1337" + data.item.front_image.formats.large.url} onDragStart={handleOnDragStart} />
            <img src={"http://localhost:1337" + data.item.front_image.formats.large.url} onDragStart={handleOnDragStart}   />
            <img src={"http://localhost:1337" + data.item.front_image.formats.large.url} onDragStart={handleOnDragStart}   />
 
          </AliceCarousel>
        </div>
      </div>)
  } 
}
