import logo from './logo.svg';
import './App.css';
import Movies from './components/Movies';
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useRef } from 'react';
import Filtered from './components/Filtered';
import Header from './components/Header';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function getWindowDimensions() {
  let width = window.innerWidth;
  return width
}


function App() {

  const[movieList,setMovieList] = useState([])

  const[filters,setFilters] = useState([{id:1,type:"Language",referrence:"movielanguages",show:false,checked:"false"},{id:2,type:"Country",referrence:"moviecountries",show:false,checked:"false"},{id:3,type:"Genre",referrence:"moviegenres",show:false,checked:"false"}])

  const[appliedFilters,setAppliedFilters] = useState({})

  const[filterData,setFilterData] = useState([])

  const appliedObject = useRef({})

  const movieCopy = useRef(null)

  const[render,setRender] = useState(true)

  const[showFilter,setShowFilter] = useState(false)

  const[width,setWidth] = useState("100%")

  const[background,setBackground] = useState("")

  const[centre,setCentre] = useState("")

  const[showAll,setShowAll] = useState(false)

  const allFilters = useRef([])

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());



  useEffect(()=>{
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  },[])

  useEffect(()=> {

let fetchAndSetData = () => {
// Get the data from JSON and set the data according to requirement for filtering
  let languageObj = {}
  let countryObj = {}
  let genreObj = {}

  let filterOptions = []  // temp storage for required filters
  
            axios.get('/movies.json').then((res)=> {
                setMovieList(res.data)
                movieCopy.current = res.data

                // mapping over response and pushing the values accordingly to specific objects
                res.data.map((ele)=> {
                  ele.movielanguages.map((lan)=> {
                    languageObj[lan] = "created"
                  })
                  ele.moviecountries.map((country)=> {
                    countryObj[country] = "created"
                  })
                  ele.moviegenres.map((genre)=> {
                    genreObj[genre] = "created"
                  })
                })

                filterOptions.push({movielanguages:Object.keys(languageObj)})
                filterOptions.push({moviecountries:Object.keys(countryObj)})
                filterOptions.push({moviegenres:Object.keys(genreObj)})

                filters.map((filter)=>{
                  filterOptions.map((ele)=> {
                    if(ele.hasOwnProperty(filter.referrence)){
                      filter.options = []
                      Object.values(ele)[0].map((val)=> {
                        filter.options.push({value:val,checked:false})
                      })
                    }
                  })
                })

                setFilters([...filters]) // final data set for filter

            })

        }

        fetchAndSetData()
  },[])


  const onHandleFilter = (filter) => {
    setFilters(filters.map((ele)=> {
      if(ele.id == filter.id) {
        ele.show = !ele.show
      }

      return ele
    }))
  }

  const onHandleFilterOptionsChange = (e,element,option) => {


    if(e.target.checked == false) {

      
      appliedObject.current[element.referrence] =  appliedObject.current[element.referrence].filter((ele)=> {
        return ele !=option.value
       })

       movieCopy.current = movieList;

       let newDataFilter = [...filters].map((ele)=> {
        let target = ele.options.map((t)=> {
          if(t.value == option.value) {
            t.checked = false;
          }

          return t
        })

        ele.options = target;

        return ele
       })


       setFilters(newDataFilter)
      

       let highestLength = 0;



       for(let keys in appliedObject.current) {
        if(appliedObject.current[keys].length>highestLength) {
          highestLength = appliedObject.current[keys].length
        }
       }

       if(highestLength<=0) {
        setRender(true)
       }

       console.log(appliedObject.current)
    }


    else {

      let newDataFilter = [...filters].map((ele)=> {
        let target = ele.options.map((t)=> {
          if(t.value == option.value) {
            t.checked = true;
          }

          return t
        })

        ele.options = target;

        return ele
       })

       setFilters(newDataFilter)

      setRender(false)

      if(appliedObject.current[element.referrence] == undefined) {
        appliedObject.current[element.referrence] = []
      }
  
      // created keys in appliedObject to store applied filters existing
      appliedObject.current[element.referrence] = [...appliedObject.current[element.referrence],option.value]
  
  
    }

    // storing filtered result in blank array, on each function call it will set up a newData
    let filteredResult = []

    // Number of iteration stored to know if the iteration passes to another section so data can be accordingly filtered with specific conditions

    let numberOfIterations = 0;

    for(let keys in appliedObject.current) {

      if(numberOfIterations>0 && filteredResult.length>0) {
        movieCopy.current = filteredResult;
      }

      appliedObject.current[keys].filter((keyValues)=> {

        movieCopy.current.filter((movies)=> {
          let found = false;
         movies[keys].filter((find)=> {
          if(find == keyValues) {

            found = true;

          let searchExisting = filteredResult.find((ele)=> {
            return ele.imdbmovieid == movies.imdbmovieid
          })

          if(!searchExisting) {
            filteredResult.unshift(movies)
          }
          }
         })

         if(found == false) {
          if(numberOfIterations>0 && filteredResult.length>0) {
             filteredResult = filteredResult.filter((ele)=> {
              return ele.imdbmovieid != movies.imdbmovieid
            })

           if(keys != "movielanguages") {
            movieCopy.current = filteredResult;
           }
          }
         }
         
        })
    
      })
      console.log(filteredResult)

      numberOfIterations++
    }

    let tempArr = []

    for(let keys in appliedObject.current) {
      let tempObj = {}
      tempObj[keys] = appliedObject.current[keys]
      tempArr.push(tempObj)
    }

    console.log(tempArr)
    allFilters.current = tempArr

    console.log(allFilters.current)
    setAppliedFilters(appliedObject.current)
    setFilterData(filteredResult)
    console.log(appliedObject.current)
    console.log(movieCopy.current)
  }

  const onHandleShowFilter = () => {
    setShowFilter(!showFilter)


    if(windowDimensions <=780) {
      setWidth("100%")
    }

    else {

      
    if(showFilter == false) {
      setWidth("70%")
      setBackground("white")
      setCentre("left")
    }
    else {
      setWidth("100%")
      setCentre("center")
    }

    }

  }

  useEffect(()=> {
    let found = 0;
    let data = allFilters.current.map((ele)=> {      
      for(let keys in ele) {
        if(ele[keys] != undefined && ele[keys].length>0) {
          found++
        }
      }

      return ele
    })

    if(found>0) {
      setShowAll(true)
    }

    else {
      setShowAll(false)
    }

  },[allFilters.current])


  return (
    <div className="App">
        <Header/>
        {showAll?<section className='applied-filter-section'>
        <div className='appliedFilter-container'>          
          {allFilters.current.map((ele,i)=> {
            return(
              <div>
                {Object.keys(ele).map((key)=> {
                  return(<div className='filer-applied' key={i}>
                    {Object.values(ele)[0].map((val)=> {
                      return(
                        <h6>
                        {val}
                        </h6>
                      )
                    })}
                    </div>)
                })}
              </div>
            )
          })}
        </div>
      </section>:""}
        
        <section>
          <div className='task-bar'>
          <Button variant="dark" onClick={onHandleShowFilter} className='buttons-general'>{showFilter?<span>Hide Filter</span>:<span>Show Filter</span>}</Button>
          <Button variant="dark" className='buttons-general'><span>IMDB Movie Reviews</span></Button>{' '}


          </div>
        </section>
    <section className='filter-movies-container'>
      {showFilter?<aside className='filter-container' style={{backgroundColor:'white'}}>
        <div className='filter-wrapper' style={{backgroundColor:background}}>
        {filters.map((filter,i)=> {
          return(
            <div className='filters' key={i}>
              <h6 onClick={()=>onHandleFilter(filter)}>{filter.type}{filter.show?<img src='/arrow-left (2).png' style={{rotate:'180deg',transition:'rotate 0.5s'}}/>:<img src='/arrow-left (2).png' style={{transition:'rotate 0.5s'}}/>}</h6>
              {filter.show?<div className='options'>
              {filter.options.map((options)=>{
                return(
                  <div className='option-div'>
                  <input type='checkbox' onChange={(e)=>onHandleFilterOptionsChange(e,filter,options)} defaultChecked = {options.checked}/>
                  <span>{options.value}</span>
                  </div>
                )
              })}
            </div>:""}
            </div>
          )
        })}
        </div>
      </aside>:""}
      
      {/* {Object.keys(appliedObject.current).length<=0?<Movies data = {movieList}/>:<Filtered data = {filterData}/>} */}
      {render?<Movies data = {movieList} width = {width} allign = {centre}/>:<Filtered data = {filterData} width = {width} allign = {centre}/>}
      </section>

    </div>
  );
}

export default App;
