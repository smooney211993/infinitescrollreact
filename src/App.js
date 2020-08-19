import React, {useState, useEffect}  from 'react';
import './App.css';
import loading from './infinitescroll.svg'
import GetImages from './Api/api'


const App = () => {
  const [ready, setReady] = useState(false)
  const [images] = GetImages(ready);
  const [loaded, setLoaded] =useState(false);
  let [imagesLoaded, setImagesLoaded] = useState(0)
  

  useEffect(() => {
    const handleScroll = ()=>{
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        setReady(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {  
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const imagesOnLoad = () =>{
    setImagesLoaded(imagesLoaded ++)
    const totalImages = images.length;
    console.log(imagesLoaded);
    if(imagesLoaded <= totalImages){ 
        setReady(true)
        setLoaded(true)

    }
   }
  const renderImages = () =>{
    return images.map((image,i)=>{
      return (<img src={image.imageUrl} alt={image.description} key ={i} onLoad = {()=>imagesOnLoad()}/>)
    })
  }
  const renderLoadingCircle = ()=>{
    if(loaded){
      return 
    }
     return (<div className="loader" id="loader"><img src={loading} alt="loading"/></div>)
  } 
  return (
    <div>
    <h1>Infinite Scroll</h1>
      {renderLoadingCircle()}
    <div className="image-container" id="image-container" >
        {renderImages()}
    </div>
    </div>
    
  );
}

export default App;
