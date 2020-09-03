import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GetItem = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
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

  if (error) {
    console.log(error)
    return <>Error Loading Data</>
  }  

  if (data) {
    console.log('data', data)
    return <>yoo {data.item.name}</>
  } 
}
