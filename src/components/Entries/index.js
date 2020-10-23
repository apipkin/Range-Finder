import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';

import Entry from '../Entry';
import EntryContext from './Context';

const Entries = () => {
  const [ entries ] = useContext(EntryContext);
  let offset = 0;
 
  return (
    <div>
      { (entries || []).map((entry, index) => {
        const lockedOffset = offset;

        offset += entry[1];

        return (
          <Entry key={uuid()} entry={entry} entryIndex={index} offset={lockedOffset} />
        );
      })}
    </div>
  );
};

export default Entries;
