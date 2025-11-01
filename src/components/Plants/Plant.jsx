import "./Plant.css"
import { savedPlantsService, savePlantToGarden } from "../../services/plantService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Plant( {plant, currentUser, getAndSetAllPlants} ) {
    // if there is a saved plant object with the current user id and plant id, save button is not visible
    // create useState for current savedPlantObj
    const [currentSavedPlant, setCurrentSavedPlant] = useState([])
    // const [showButton, setShowButton] = useState(true)

    useEffect(() => {
        if (!currentUser || !currentUser.id) {
            return
        } 
        savedPlantsService(currentUser.id).then((savedPlantArr) => {
            // console.log("What type is this?", typeof savedPlantArr)
            // console.log("Raw data from API:", savedPlantArr) // Add this line
            const savedPlantObj = savedPlantArr.filter((plantObj) => {
                return plantObj.plantId === plant.id
            })
            setCurrentSavedPlant(savedPlantObj)
            // console.log("Saved plant object:", savedPlantObj)
        })
    }, [currentUser, plant])

    const showSaveButton = () => {
        if (currentSavedPlant.length > 0) {
            return <button className="fa fa-plus save-button"/>
        } else {
            return <button 
                className="fa fa-plus save-to-garden-btn"
                value={plant.id}
                onClick={handleSaveToGarden}
            />
        }
    }

    const handleSaveToGarden = () => {
        const savedPlant = {
            plantId: plant.id,
            userId: currentUser.id
        }

        savePlantToGarden(savedPlant).then(() => {
            console.log("Plant Saved: ", savedPlant)
            getAndSetAllPlants()
        })
    }

    const renderDefaultImage = (e) => {
        console.log("Image fialed to load, showing default")
        e.target.onerror = null;
        e.target.src = "https://static.vecteezy.com/system/resources/previews/011/839/326/non_2x/tree-planting-icon-sapling-icon-and-illustration-vector.jpg"
    }

    const getImageSrc = () => {
        if (!plant.imageURL || plant.imageURL === "") {
            console.log("using default image from getImageSrc")
            return ""
        } 
        return plant.imageURL
    }

    return (
        <section className="plant">
            <Link to={`/plants/plant-details/${plant.id}`} >
                <div className="plant-image">
                    <img src={getImageSrc()} alt={plant.name} onError={renderDefaultImage}/>
                </div>
            </Link>
            <div className="plant-info">
                <div className="plant-name">{plant.name}</div>  
                {/* <div> */}
                {showSaveButton()}
                {/* </div> */}
            </div>
        </section>
    )
}

export default Plant;