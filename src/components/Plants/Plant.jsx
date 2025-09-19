import "./Plant.css"
import { savePlantToGarden } from "../../services/plantService";
import { Link } from "react-router-dom";

function Plant( {plant, currentUser} ) {
    const handleSaveToGarden = () => {
        const savedPost = {
            plantId: plant.id,
            userId: currentUser.id
        }

        savePlantToGarden(savedPost).then(() => {
            console.log("Post Saved: ", savedPost)
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
                <button 
                    className="save-to-garden-btn"
                    value={plant.id}
                    onClick={handleSaveToGarden}
                >
                    Save
                </button>
            </div>
        </section>
    )
}

export default Plant;