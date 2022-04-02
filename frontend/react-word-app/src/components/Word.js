import React from 'react'
import './word.css'
import axios from 'axios';

function Word({word,deleteFunction,updateFunction}) {

  return (
      <div className='wordRow'>
          <p className='word'>{word.word}</p>
          <button className='updateBtn' onClick={() =>updateFunction(word._id, word.word)}>Update</button>
          <button className='deleteBtn' onClick={() =>deleteFunction(word._id)}>Delete</button>
      </div>
    
  )
}

export default Word;