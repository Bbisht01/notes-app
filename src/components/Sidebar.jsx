import React, { useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import {useDispatch, useSelector } from 'react-redux';
import { deleteData, updateData } from '../redux/actions';
import { createClient } from '@supabase/supabase-js'
import { postDataToReducer } from '../redux/actions';
import { v4 as uuidv4 } from 'uuid';


var key = process.env.REACT_APP_API_KEY;

const supabaseUrl = 'https://wzujkqspuyhattvnuwsz.supabase.co'
const supabaseKey = key
const supabase = createClient(supabaseUrl, supabaseKey)


export default function Sidebar() {

  const [query, setQuery] = useState("")
  const [input, setInput] = useState("")
  const [text, setTextarea] = useState("")
  const [editTime, setEditTime] = useState("");

  const dispatch = useDispatch()

  const selector = useSelector((state)=> state.getData)


   //MAKE NEW NOTES AND ADD TO LIST

  const addToNotes = () => {
    let id = uuidv4();
    // console.log(id)
    if(editTime != null && editTime != "")
    {
      async function editData() {
        const { data, error } = await supabase
          .from('users')
          .update({ Title: input, Description:text })
          .eq('Time', editTime)      
      }
      editData()
      dispatch(updateData(id))
    }
    else{
      const payload = {
        Title: input,
        Description: text, 
        Time: id         
      }
      // console.log(payload)
      async function postData() {
        const { data, error } = await supabase
            .from('users')
            .insert([{
              Title: input,
              Description: text,
              Time: id     
            }])
      }
      postData()
      dispatch(postDataToReducer(payload))
    }
  //  window.location.reload(false)
  }
 

  //DELETE THE NOTES
   const deleteItem = async(id)=>{   
    async function deleteDatafromUi() {     
      const { data, error } = await supabase
            .from('users')
            .delete()
            .eq("Time", id)
    }
    deleteDatafromUi() 
    dispatch(deleteData(id))
    // window.location.reload(false)
    // console.log(id)    
  } 

  return (    
    <div className='app-sidebar'>
        <div className="container">
        <div className='app-sidebar-header'>
            <IoSearchOutline className='search-icon'/>
            <input type="text" onChange={event => setQuery(event.target.value)} />
            <div className='app-sidebar-header'>
            <button onClick={addToNotes}>+</button>              
            </div>
            
        </div>
        <div className="app-sidebar-notes">
            <div className="app-sidebar-note">
                <div className="app-sidebar-title">                    
                        {
                        selector.filter(el => {
                            if (query === '') {
                              return el;
                            } else if (el.Title.toLowerCase().includes(query.toLowerCase())) {
                              return el;
                            }
                          })
                        .map((el)=>{
                        return(
                            <div className='sidebar-note-title' onClick={()=> {
                              setInput(el.Title);
                              setTextarea(el.Description);
                              setEditTime(el.Time);
                            }}>
                            <h3>{el.Title}</h3>
                            <button onClick={()=>deleteItem(el.Time)}>Delete</button>
                            </div>
                        )
                        })
                        }                                       
                    
                </div>               
            </div>
        </div>
        </div>
        <div className='app-main'>
        <div className="app-main-note-edit">            
            <input type="text" id='title' value={input} autoFocus onChange={(e)=> setInput(e.target.value)}/>
            <textarea id="body" cols="30" value={text} rows="10" onChange={(e)=> setTextarea(e.target.value)}></textarea>

        </div>              
    </div>
    </div>
    
  )
}
