import { Link, useNavigate } from "react-router-dom";
import "./Plant.css"
import { deletePlantService } from "../../services/plantService";

function UserCreatedPlants({ plant, getAndSetCreatedPlants }) {
    const navigate = useNavigate()

    const navToEditPlant = () => {
            navigate(`/plants/edit-plant/${plant.id}`)
    }

    const handlePlantDelete = () => {
        deletePlantService(plant.id).then(() => {
            getAndSetCreatedPlants()
        })
    }

    const renderDefaultImage = (e) => {
        console.log("Image fialed to load, showing default")
        e.target.onerror = null;
        e.target.src = "https://static.vecteezy.com/system/resources/previews/011/839/326/non_2x/tree-planting-icon-sapling-icon-and-illustration-vector.jpg"
    }

    return (
            <section className="plant">
            <Link to={`/plants/plant-details/${plant.id}`} >
                <div className="plant-image">
                    <img src={plant.imageURL} alt={plant.name} onError={renderDefaultImage}/>
                </div>
            </Link>
            <div className="plant-info">
                <div className="created-plant-name">{plant.name}</div>
                <div className="btn-container">
                    <button key={plant.id} onClick={navToEditPlant} className="fa fa-edit edit-btn"/>
                    <button className="fa fa-trash delete-btn" onClick={handlePlantDelete}/>
                </div>             
            </div>
        </section>
    )
}

export default UserCreatedPlants;