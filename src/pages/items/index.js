import React from 'react';
import { useQuery, gql } from '@apollo/client';
import VoronoiTreeMap from '../../components/voronoiTreeMap';

const GetAllItems = gql`
  query GetAllItems {
    items {
      id
      name
      front_image { formats }
    }
  }
`;

export default function Index() {
 const { loading, error, data } = useQuery(GetAllItems); 

  if (loading)
    return <>Loading...</>

  if (error)
    return <>Error fetching data</>

  return (
    <>
      <VoronoiTreeMap items={data.items} />
    </>
  )
}
