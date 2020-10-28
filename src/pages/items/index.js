import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import VoronoiTreeMap from '../../components/voronoiTreeMap';

const GetAllItems = gql`
  query GetAllItems {
    collectionByHandle(handle: "In-Stock") {
      products(first: 250) {
        edges {
          node {
            id
            title
            productType
            description
            tags
            images(first: 10) {
              edges {
                node {
                  id
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery(GetAllItems);
  const [cleanData, setCleanData] = useState(null);

  useEffect(() => {
    if (!data) return;
    const newData = data.collectionByHandle.products.edges.map(obj => obj.node)
    console.log(newData);
    setCleanData(cleanData);
  }, [data])

  if (loading)
    return <>Loading...</>

  if (error)
    return <>Error fetching data</>

  return (
    <>
      <VoronoiTreeMap items={data.collectionByHandle.products.edges.map(obj => obj.node)} />
    </>
  )
}
