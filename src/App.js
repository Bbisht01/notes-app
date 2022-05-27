import './App.css';
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import { getDataFromSupabase } from './redux/actions';

var key = process.env.REACT_APP_API_KEY;

const supabaseUrl = 'https://wzujkqspuyhattvnuwsz.supabase.co'
const supabaseKey = key
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {  

  const dispatch = useDispatch()

  useEffect(()=> {
    async function getData(){    
      let { data, error } = await supabase
      .from('users')
      .select('*')    
      console.log(data)      
      dispatch(getDataFromSupabase(data))
      }
      getData()
  },[])

  return (
    <div className="App">        
        <Sidebar/>       
    </div>
  );
}

export default App;
