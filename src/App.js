import React, {useState, useEffect}  from 'react';
import './App.css';
import loading from './infinitescroll.svg'
import GetImages from './Api/api'


const App = () => {
  const [ready, setReady] = useState(false)
  const [images,loaded] = GetImages(ready);
  let [imagesLoaded, setImagesLoaded] = useState(0)
  

  const scroll = ()=>{
    window.addEventListener('scroll',()=>{
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        setReady(false)
      }
    })
  }

  const imagesOnLoad = () =>{
    setImagesLoaded(imagesLoaded ++)
    const totalImages = images.length/2;
    console.log(imagesLoaded)
    if(imagesLoaded <= totalImages){ 
        setReady(true)

    }
   }
  const renderImages = () =>{
    return images.map((image,i)=>{
      return (<img src={image.imageUrl} alt={image.description} key ={i} onLoad = {()=>imagesOnLoad()}/>)
    })
  }
  const renderLoadingCircle = ()=>{
    if(!loaded){
      return 
    }
     return (<div className="loader" id="loader"><img src={loading} alt="loading"/></div>)
  }
  return (
    <div onScroll={()=>scroll()}>
    <h1>Infinite Scroll</h1>
          {renderLoadingCircle()}
    <div className="image-container" id="image-container" >
        {renderImages()}
    </div>
    </div>
    
  );
}

export default App;
