// display one plant card with the plant name, picture, and add to garden button
// 
import "./Plant.css"

function Plant( {plant} ) {
    return (
        <section className="plant">
            <div className="plant-image">
                <img src={plant.imageURL} alt={plant.name}/>
            </div>
            <div className="plant-info">
                <div>{plant.name}</div>
                <button className="save-to-garden-btn">Save</button>
            </div>
        </section>
    )
}

export default Plant;