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
    if(editTime != "")
    {
      const payload = {
        Title: input,
        Description: text, 
        UniqueId: id         
      }
      let nArr = []
      
      selector.map((el)=>{
        if(el.UniqueId == payload.UniqueId){
          nArr.push(payload)
        } else {
          nArr.push(el)
        }
      })
      dispatch(updateData(nArr))
      async function editData() {
        const { data, error } = await supabase
          .from('users')
          .update({ Title: input, Description:text })
          .eq('UniqueId', editTime)      
      }
      editData()
    
    }
    else{
      const payload = {
        Title: input,
        Description: text, 
        UniqueId: id         
      }
      // console.log(payload)
      async function postData() {
        const { data, error } = await supabase
            .from('users')
            .insert([{
              Title: input,
              Description: text,
              UniqueId: id     
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
            .eq("UniqueId", id)
    }
    deleteDatafromUi() 
    dispatch(deleteData(id))
    // console.log(id)    
  } 

  return (    
    <div className='app-sidebar'>
        <div className="container">
          <div className='header'>
          <h3>Notes App</h3>
          <button onClick={addToNotes}><img src="https://www.way2order.com/images/edit.png" width="22px" alt='img'/></button>
          </div>
        <div className='app-sidebar-header'>
            <IoSearchOutline className='search-icon'/>
            <input type="text" placeholder='Search all notes...' onChange={event => setQuery(event.target.value)} />           
            
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
                          // console.log(el+"new")
                        return(
                            <div className='sidebar-note-title' onClick={()=> {
                              setInput(el.Title);
                              setTextarea(el.Description);
                              setEditTime(el.UniqueId);
                            }}>
                            <h4>{el.Title}</h4>
                            <button onClick={()=>deleteItem(el.UniqueId)}>Delete</button>
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
