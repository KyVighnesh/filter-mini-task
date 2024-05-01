import React, { useEffect, useState } from 'react'
import styles from '../stylesheets/movies.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const Filtered = (props) => {

    const[data,setData] = useState([])

    useEffect(()=> {
        setData(props.data)
    },[props.data])
  return (
        <div className='movie-root-container' style={{width:props.width}}>
            <div className='movie-wrapper' style={{justifyContent:props.allign}}>
            {data.map((ele,i)=> {
                return(
                    <div className='movie-cards' key={i}>
                    <img src = {ele.moviemainphotos[0]}/>
                    <h4>{ele.movietitle}</h4>
                    <div className='genre-container'>
                    {ele.moviegenres.map((generes,i)=> {
                        return(
                            <div key={i}>
                                <Button variant="secondary"><span>{generes}</span></Button>{' '}
                            </div>
                        )
                    })}
                    </div>
                </div>
                )
            })}

            {data !=undefined && data.length<=0?<h4>No Results Found, Check Back Filters</h4>:""}
            </div>
        </div>

  )
}

export default Filtered