import React, { createContext } from 'react';
import useEntries from './useEntries';

const EntriesContext = createContext([
  [],
  {},
]);

const EntriesProvider = (props) => {
  const { entries, ...entriesFns } = useEntries();

  return <EntriesContext.Provider {...props} value={[ entries, entriesFns ]} />;
};

export { EntriesProvider };
export default EntriesContext;

