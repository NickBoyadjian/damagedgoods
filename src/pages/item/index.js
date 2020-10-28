import React, { useEffect } from 'react';
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

export default function Index({ id, addVariantToCart }) {
  const { loading, error, data } = useQuery(GetItem, {
    variables: { id },
  });

  useEffect(() => {
    console.log("props")
  }, [data])

  if (loading)
    return <>Loading...</>

  if (error)
    return <>Error Loading Data</>

  return (
    <div className='container item-container'>
      {data.nodes[0].title}
      <br />
      {data.nodes[0].description}

      {data.nodes[0].id}

    </div>)
}
