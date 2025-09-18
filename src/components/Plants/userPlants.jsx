import "./Plant.css"

function UserCreatedPlants( {plant} ) {
    return (
            <section className="plant">
            <div className="plant-image">
                <img src={plant.imageURL} alt={plant.name}/>
            </div>
            <div className="plant-info">
                <div>{plant.name}</div>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn">Delete</button>                
            </div>
        </section>
    )
}

export default UserCreatedPlants;