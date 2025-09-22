import "./Plant.css"
import { savedPlantsService, savePlantToGarden } from "../../services/plantService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Plant( {plant, currentUser, getAndSetAllPlants} ) {
    // if there is a saved plant object with the current user id and plant id, save button is not visible
    // create useState for current savedPlantObj
    const [currentSavedPlant, setCurrentSavedPlant] = useState([])
    const [showButton, setShowButton] = useState(true)

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
            return <p><em>Saved</em></p>
        } else {
            return <button 
                className="save-to-garden-btn"
                value={plant.id}
                onClick={handleSaveToGarden}
            >
                Save
            </button>
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

    return (
        <section className="plant">
            <Link to={`/plants/plant-details/${plant.id}`} >
                <div className="plant-image">
                    <img src={plant.imageURL} alt={plant.name}/>
                </div>
            </Link>
            <div className="plant-info">
                <div>{plant.name}</div>  
                <div>
                { showSaveButton()   
                    // <button 
                    //     className="save-to-garden-btn"
                    //     value={plant.id}
                    //     onClick={handleSaveToGarden}
                    // >
                    //     Save
                    // </button>
                }
                </div>
            </div>
        </section>
    )
}

export default Plant;