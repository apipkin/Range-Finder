import React from 'react';

import { v4 as uuid } from 'uuid';

import { 
  EntryEl,
  EntryName,
  EntryCount,
  EntryLocation,
  EntryRange,
  EntryMarker,
  EntryMarked,
} from './Elements';

const Entry = ({ entry, entryIndex }) => {
  const { name, count, location, offset, marked, ref } = entry;
  
  const markers = Array(+count).fill(null).map((e, i) => (
    <EntryMarker data-entry={ offset + i + 1} data-index={entryIndex} key={uuid()} />
  ));

  return (
    <EntryEl ref={ref} marked={marked}>
      { markers }
      <EntryName>{name}</EntryName>
      <EntryCount>{count}</EntryCount>
      <EntryLocation>{location}</EntryLocation>
      <EntryRange>({offset} - {offset + count})</EntryRange>
      <EntryMarked marked={marked} />
    </EntryEl>
  );
};

export default Entry;
