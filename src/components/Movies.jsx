import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import styles from '../stylesheets/movies.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const Movies = (props) => {

    const[movies,setMovies] = useState([])

    useEffect(()=>{
        setMovies(props.data)
        console.log(props.data)
    },[[props.data]])

  return (
    
        <div className='movie-root-container' style={{width:props.width}}>
            <div className='movie-wrapper'>
        {movies.map((ele,i)=> {
            return(
                <div className='movie-cards' key={i}>
                    <img src = {ele.moviemainphotos[0]}/>
                    <h5>{ele.movietitle}</h5>
                    <div className='genre-container'>
                    {ele.moviegenres.map((generes,i)=> {
                        return(
                            <div key={i}>
                                {/* <button className='genre-buttons'>{generes}</button> */}
                                <Button variant="secondary"><span>{generes}</span></Button>{' '}

                            </div>
                        )
                    })}
                    </div>
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default Movies