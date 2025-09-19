import { Link } from "react-router-dom"
import "./Plant.css"

function SavedPlant( {plant} ) {
    return (
        <section className="plant">
            <Link to={`/plants/plant-details/${plant.plantId}`} >
                <div className="plant-image">
                    <img src={plant.plant.imageURL} alt={plant.plant.name}/>
                </div>
            </Link>
            <div className="plant-info">
                <div>{plant.plant.name}</div>
                <button className="remove-from-garden-btn">Remove</button>
            </div>
        </section>
    )
}

export default SavedPlant