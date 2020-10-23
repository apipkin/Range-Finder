import React from 'react';

import { EntriesProvider } from './components/Entries/Context';

import LoadFile from './components/LoadFile';
import RangeFinder from './components/RangeFinder';

const App = () => {
  return (
    <EntriesProvider>
      <div>
        <LoadFile />
        <RangeFinder />
      </div>
    </EntriesProvider>
  );
}

export default App;
