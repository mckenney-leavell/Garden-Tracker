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

    return (
            <section className="plant">
            <Link to={`/plants/plant-details/${plant.id}`} >
                <div className="plant-image">
                    <img src={plant.imageURL} alt={plant.name}/>
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