import "./Plant.css"
import { savePlantToGarden } from "../../services/plantService";

function Plant( {plant, currentUser} ) {
    // handle save
    // object with id, currentUser.id, and plant.id
    // save object to database using savePlantToGarden()
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
            <div className="plant-image">
                <img src={plant.imageURL} alt={plant.name}/>
            </div>
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