import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './style.scss'

const GetItem = gql`
  query GetItem($id: ID!) {
    nodes(ids: [$id]) {
      ...on Product {
        id
        title
        description
      
      }
    }
  }
`;

export default function Index() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GetItem, {
    variables: { id },
  });

  useEffect(() => {
    console.log("data")
    console.log(data)
  }, [data])

  if (loading)
    return <>Loading...</>

  if (error)
    return <>Error Loading Data</>

  if (data) {
    const handleOnDragStart = (e) => e.preventDefault()
    return (
      <div className='container item-container'>
        {data.nodes[0].title}
        <br />
        {data.nodes[0].description}
      </div>)
  }
}
