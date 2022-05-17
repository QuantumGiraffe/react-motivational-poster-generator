

import React from "react"

// Basic Poster Layout 
// =======================================================
export default function Poster() {
    const [poster, setPoster] = React.useState({
        topText: "",
        bottomText: "",
        // Will display this default image background if the fetch does not work for some reason
        randomImage: "https://images.unsplash.com/photo-1622602655988-ec90fd29ff3a?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=MnwzMjc4NTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTI4MTI3MDg&amp;ixlib=rb-1.2.1&amp;q=80&amp;w=1080"
    })
    const [allPosters, setAllPosters] = React.useState([])
    
    
    // Fetch a random poster URL
    // =======================================================
    React.useEffect(() => {
        async function getPosters() {
            const res = await fetch("https://api.unsplash.com/photos/random?orientation=landscape&query=teamwork&client_id=dw9oA4JSWT9Q3VVRz6QLu8rCfO_kcoFhUSurmw_WZoI")
            const data = await res.json()

            console.log(data)
            setAllPosters(data.urls.regular)


        }
        getPosters()
    }, [])
    

    // Handle Change
     // =======================================================
    function handleChange(event) {
        const {name, value} = event.target
       
        setPoster(prevPoster => ({
            ...prevPoster,
            [name]: value
        }))
    }
    


    // Still working on how to get image to change within page. For now, this allows the app to function
    function refreshPage(){
        window.location.reload();
    } 


    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={poster.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={poster.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={refreshPage}
                >
                    Get a new poster image 🖼
                </button>
            </div>
            <div className="poster">
                <img src={allPosters} className="poster--image" alt="random background from Unsplash" />
                <h2 className="poster--text top">{poster.topText}</h2>
                <h2 className="poster--text bottom">{poster.bottomText}</h2>
            </div>
        </main>
    )
}