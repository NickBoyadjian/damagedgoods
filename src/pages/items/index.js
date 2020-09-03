import React from 'react';
import VoronoiTreeMap from '../../components/voronoiTreeMap';

export default function Index({items}) {

  if (!items)
    return <>Loading...</>
 
  return (
    <>
      <VoronoiTreeMap items={items} />
    </>
  )
}
