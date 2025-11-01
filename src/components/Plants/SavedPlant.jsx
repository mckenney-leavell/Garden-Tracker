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

    const renderDefaultImage = (e) => {
        console.log("Image fialed to load, showing default")
        e.target.onerror = null;
        e.target.src = "https://static.vecteezy.com/system/resources/previews/011/839/326/non_2x/tree-planting-icon-sapling-icon-and-illustration-vector.jpg"
    }

    return (
        <section className="plant">
            <Link to={`/plants/plant-details/${plant.plantId}`} >
                <div className="plant-image">
                    <img src={plant.plant.imageURL} alt={plant.plant.name} onError={renderDefaultImage} />
                </div>
            </Link>
            <div className="plant-info">
                <div className="plant-name">{plant.plant.name}</div>
                <button onClick={handleSavedPlantDelete} className="fa fa-trash remove-from-garden-btn"/>
            </div>
        </section>
    )
}

export default SavedPlant