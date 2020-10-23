import React, { useContext, useState, createRef } from 'react';

import EntriesContext from '../Entries/Context';

let entries = [];

const LoadFile = () => {
  const [, { setEntries } ] = useContext(EntriesContext);
  const [ selectedFile, setSelectedFile ] = useState({});
  const fileRef = createRef(null);
  const loadRef = createRef(null);

  let reader;

  const handleLoadClick = (e) => {
    e.preventDefault();
    loadRef.current.disable = true;
    handleLoadFile();
    setEntries(entries);
  };

  const handleFileClick = (e) => {
    fileRef.current.disable = true;
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    fileRef.current.disable = false;
  }
  
  const handleLoadFile = () => {
    reader = new FileReader();
    reader.onloadend = handleLoadEnd;
    reader.readAsText(selectedFile);
  };

  const handleLoadEnd = () => {
    const [, ...lines] = reader.result.split('\n');
    setEntries(lines.map(line => line.split(',')));
    loadRef.current && (loadRef.current.disable = false);
  }
  
  return (
    <form>
      <input ref={fileRef} type="file" accept=".csv" onChange={handleFileChange} onClick={handleFileClick}/>
      <button ref={loadRef} onClick={ handleLoadClick }>Load</button>
    </form>
  );
};

export default LoadFile;
