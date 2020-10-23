import { useReducer } from 'react';

import EntryFactory from '../Entry/Factory';

import { 
  ACTION_ADD,
  ACTION_REMOVE,
  ACTION_UPDATE,
  ACTION_REPLACE,
  ACTION_CLEAR, 
} from './CONSTANTS';

const initialState = null;

const sanitizeEntries = (entries) => {
  if (Array.isArray(entries)) {
    let offset = 0;

    const es = entries.map(entry => {
      const madeEntry = EntryFactory(entry, offset);

      offset += madeEntry.count;

      return madeEntry;
    });

    return es;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_ADD:
      if (!action.payload && !action.payload.entry) {
        throw new Error('Value not provided to add entry.');
      }

      return sanitizeEntries([ ...state, action.payload.entry ]);

    case ACTION_REMOVE:
      if (!action.payload && (!action.payload.index && action.payload.index !== 0)) {
        throw new Error('Index not provided to remove item.');
      }

      return sanitizeEntries([ ...state.filter((v,i) => i !== action.payload.index) ]);

    case ACTION_UPDATE:
      if (!action.payload && !action.payload.entry && (!action.payload.index && action.payload.index !== 0)) {
        throw new Error('Either value or index is not provided to update item.');
      }

      const { entry, index } = action.payload;

      return sanitizeEntries([
        ...state.slice(0, index ), 
        entry, 
        ...state.slice(index + 1)
      ]);

    case ACTION_REPLACE:
      if (!action.payload && !action.payload.entries) {
        throw new Error('Value not provide to replace entries.');
      }
      return sanitizeEntries([ ...action.payload.entries ]);

    case ACTION_CLEAR:
      return [];

    default: 
      return state;
  }
}

const useEntries = () => {
  const [ entries, dispatch ] = useReducer(reducer, initialState);

  const addEntry = (entry = null) => {
    dispatch({
      type: ACTION_ADD,
      payload: { entry },
    });
  };

  const removeEntryAtIndex = (index = null) => {
    dispatch({
      type: ACTION_REMOVE,
      payload: { index }
    });
  };

  const replaceEntryAtIndex = (entry = null, index = null) => {
    dispatch({
      type: ACTION_UPDATE,
      payload: { entry, index }
    });
  };

  const setEntries = (entries = []) => {
    dispatch({
      type: ACTION_REPLACE,
      payload: { entries }
    });
  };

  const clearEntries = () => {
    dispatch({
      type: ACTION_CLEAR,
    });
  };

  const getSize = () => (entries && entries.length) || 0;

  const getEntryAtIndex = (index) => entries[index];

  const getEntryAtMarker = (marker) => (
    entries.filter(entry => (
      entry.offset <= marker && (entry.offset + entry.count) >= marker
    ))[0]
  );

  return {
    entries,
    addEntry,
    removeEntryAtIndex,
    replaceEntryAtIndex,
    setEntries,
    clearEntries,
    getSize,
    getEntryAtIndex,
    getEntryAtMarker,
  };
};

export default useEntries;
