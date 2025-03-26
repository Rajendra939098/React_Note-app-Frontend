import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditNotePage = ({Updatednote}) => {

  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')
  const [category,setCategory]=useState('')

  const navigate=useNavigate()

const {slug}=useParams()

useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/notes/${slug}`)
  .then(res=>{
    console.log(res.data)
    setTitle(res.data.title)
    setBody(res.data.body)
    setCategory(res.data.category)
 })
 .catch(err=>{
  console.log(err.message)
 })
},[slug])

const updatenote={
  title:title,
  body:body,
  category:category
}


const handleSubmit=(e)=>{
  e.preventDefault()
  if(!title && !body && !category) return;
  Updatednote(updatenote,slug)
  navigate(`/notes/${slug}`)
}


  return (
    <form onSubmit={handleSubmit}>
    <h5>update Note</h5>
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder="Enter note's title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Content
      </label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows={4}
        placeholder="Enter note's content"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
      ></textarea>
    </div>

    <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">
        Note's category
      </label>
    <select className="form-select" aria-label="Default select example" value={category} onChange={(e)=>setCategory(e.target.value)} style={{height: "40px"}}>
        <option selected>Pick a category</option>
        <option value="BUSINESS">Business</option>
        <option value="PERSONAL">Personal</option>
        <option value="IMPORTANT">Important</option>
      </select>
    </div>

    <button className="btn btn-primary d-flex justify-content-center" style={{width:"100%"}}>Update Note</button>
  </form>
  )
}

export default EditNotePage