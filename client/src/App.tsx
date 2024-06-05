import React, { useEffect, useState } from 'react';
import { apiCall } from './services/apiCall';

export interface AllNotes {
  notes: any[];
  error: string;
  fetched: boolean;
}

const App : React.FC = () : React.ReactElement => {
  const [alchemist, setAlchemist] = useState<string>('');
  const [allNotes, setAllNotes] = useState<AllNotes>({ 
    notes: [],
    error: '',
    fetched: false 
  });

  useEffect( () => {
    console.log('loaded first time');
    
    // fetch for all records
    apiCall('GET', allNotes, setAllNotes);
  }, []);

  useEffect( () => {
    console.log('allNotes: ', allNotes);
  });

  return(
    <>ok</>
  );
}

export default App;

