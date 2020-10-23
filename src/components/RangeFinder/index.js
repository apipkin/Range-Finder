import React, { useContext } from 'react';

import Entries from '../Entries';
import EntriesContext from '../Entries/Context';
import RandomGenerator from '../RandomGenerator';

const RangeFinder = () => {
  const [ entries, { replaceEntryAtIndex, getEntryAtMarker } ] = useContext(EntriesContext);

  const maxRange = (entries || []).reduce((acc, entry) => acc + entry.count, 0);

  const locateEntry = (selectedEntry) => {
    const entry = getEntryAtMarker(selectedEntry);

    if (entry.marked) {
      throw new Error(`${entry.name} has already been marked.`);
    }

    const entryMarker = document.querySelector(`[data-entry="${selectedEntry}"]`);
    
    replaceEntryAtIndex({
      ...entry,
      marked: true,
      marker: selectedEntry,
    }, +entryMarker.dataset.index)

    const { y: top } = entry.ref.current.getBoundingClientRect();
    const halfHeight = window.innerHeight / 2;

    requestAnimationFrame(()=>{
      if (top < halfHeight) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, top - halfHeight)
      }
    });
  }

  return (
    <>
      <Entries />
      <RandomGenerator min={1} max={maxRange} next={locateEntry} />
    </>
  );
};

export default RangeFinder;
