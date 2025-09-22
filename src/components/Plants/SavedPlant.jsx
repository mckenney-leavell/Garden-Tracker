import { Link } from "react-router-dom"
import "./Plant.css"
import { deleteSavedPlantService, getSavedPlantById } from "../../services/plantService"
import { useEffect, useState } from "react"

function SavedPlant({ plant, getAndSetSavedPlants }) {
    const [savedPlant, setSavedPlant] = useState({})

    useEffect(() => {
        getSavedPlantById(plant.id).then((plantObj) => {
            setSavedPlant(plantObj)
        })
    }, [plant])

    const handleSavedPlantDelete = () => {
        deleteSavedPlantService(savedPlant.id).then(() => {
            console.log("Plant unsaved")
            getAndSetSavedPlants()
        })
    }

    return (
        <section className="plant">
            <Link to={`/plants/plant-details/${plant.plantId}`} >
                <div className="plant-image">
                    <img src={plant.plant.imageURL} alt={plant.plant.name}/>
                </div>
            </Link>
            <div className="plant-info">
                <div>{plant.plant.name}</div>
                <button onClick={handleSavedPlantDelete} className="remove-from-garden-btn">Remove</button>
            </div>
        </section>
    )
}

export default SavedPlant