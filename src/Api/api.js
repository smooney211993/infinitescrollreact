import React, {useState,useEffect} from 'react'
const url = "https://api.unsplash.com/photos/random/?count=10";
const apiKey = "3DHCWCEiH1w5jI04pxX01jRLQDqz0_2a3c2Y7Z5TvJ8"

const GetImages = (ready) =>{
    const [images,setImages] = useState([]);
    const [loaded, setLoaded] =useState(false)
    useEffect(()=>{
        const getRandomImagesFromApi =  async () =>{
            try {
                setLoaded(true)
                const response =  await fetch(url, {headers: {Authorization: `Client-ID ${apiKey}`}});
                if(response.ok){
                    const jsonResponse = await response.json();
                     const data =  jsonResponse.map((image)=>{
                        return {
                            link : image.links.html,
                            imageUrl:image.urls.small,
                            description: image.description
                        };
                    })
                    setImages([...images,...data])
                    
                } else {
                    throw new Error('unable to retrieve images')
                }
                
            } catch(error){
                console.log("Error fetching from unsplash apl", error)
            } finally {
                setLoaded(false)
            }
        }

        getRandomImagesFromApi()
    

    },[ready])
    return [images]
}



export default GetImages;