import { createRef } from 'react';

const defaultEntry = {
  name: '',
  count: 0,
  location: '',
  offset: 0,
  marked: false,
  marker: null,
}

const EntryFactory = (entry, offset = 0) => {
  if (Array.isArray(entry)) {
    const [ name, count, location ] = entry;

    return Object.freeze({
      ...defaultEntry, 
      ref: createRef(null),
      ...{
        name,
        count: +count,
        location,
        offset: +offset,
      }
    })
  }

  return Object.freeze({ ...defaultEntry, ...entry });
}

export default EntryFactory;
