import "./Plant.css"

function SavedPlant( {plant} ) {
    return (
        // <section className="plant">
        //     <div className="plant-image">
        //         <img src={plant.imageURL} alt={plant.name}/>
        //     </div>
        //     <div className="plant-info">
        //         <div>{plant.name}</div>
        //         <button className="save-to-garden-btn">Save</button>
        //     </div>
        // </section>
        <section className="plant">
            <div className="plant-image">
                <img src={plant.plant.imageURL} alt={plant.plant.name}/>
            </div>
            <div className="plant-info">
                <div>{plant.plant.name}</div>
                <button className="save-to-garden-btn">Save</button>
            </div>
        </section>
    )
}

export default SavedPlant