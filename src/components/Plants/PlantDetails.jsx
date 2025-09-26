import "./PlantDetails.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlantTypeById } from "../../services/plantService";
import "./Plant.css"

function PlantDetails({ currentUser }) {
    const [plant, setPlant] = useState({})
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getPlantTypeById(id).then((data) => {
            console.log("data value: ", data)
            setPlant(data)
        })
    }, [id])

    const getMonthAndDate = (x) => {
        const shortenedDate = x.slice(5)
        const formattedDate = shortenedDate.replace("-", "/")

            return formattedDate      
    
    }

    if (!plant.name) {
        return <div>Loading...</div>
    } 

    const renderDefaultImage = (e) => {
        console.log("Image fialed to load, showing default")
        e.target.onerror = null;
        e.target.src = "https://static.vecteezy.com/system/resources/previews/011/839/326/non_2x/tree-planting-icon-sapling-icon-and-illustration-vector.jpg"
    }

    const handleBackButton = () => navigate(-1)

    // if user created the plant, display a button that navigates to the plant edit view

    const navToEditPlant = () => {
            navigate(`/plants/edit-plant/${plant.id}`)
    }

    return (
        <div>
            {/* <h1>Plant Details</h1> */}
            <section className="plant-details">
                <div className="plant-details-header">
                    <img className="plant-details-image" src={plant.imageURL} onError={renderDefaultImage}/>
                    <div className="plant-gen-info">
                        <div><h1>{plant.name}</h1></div>

                        <div>
                        <p>Plant type: {plant.plantType.type}</p>
                        </div>

                        {plant.lastDateToPlant ? 
                            <div><p>Average days to mature: {plant.averageDaysToMature}</p></div>
                            : ""}
                        
                        {plant.useStart ? 
                            <div><p>Starter plant recommended: {plant.useStart ? <span> Yes</span> : <span> No</span>}</p></div>
                        : ""}

                        
                            <div>{plant.lastDateToPlant ? 
                            <p>Last date to plant: {getMonthAndDate(plant.lastDateToPlant)}</p>
                            : ""}
                        </div>

                    </div>
                </div>
                <div className="growing-dates-season">

                    <h3>Growing Dates by Season:</h3>

                    <div className="growing-dates">
                
                    {getMonthAndDate(plant.earliestIndoorStartDate) ?
                        <div className="indoor-dates">           
                            <div>
                                <p><strong>Start Seeds Indoors:</strong></p>
                                <p>{getMonthAndDate(plant.earliestIndoorStartDate)} - {getMonthAndDate(plant.latestIndoorStartDate)}</p>
                            </div> 
                        </div>
                    : ""}

                    {plant.springEarliestOutdoorStartDate || plant.fallEarliestOutdoorStartDate ?  
                    <div className="outdoor-dates">        
                        <p><strong>Start Seeds Outdoors:</strong></p>
                            
                        <div>{getMonthAndDate(plant.springEarliestOutdoorStartDate) ? 
                            <div>           
                                <p>Spring: {getMonthAndDate(plant.springEarliestOutdoorStartDate)} - {getMonthAndDate(plant.springLatestOutdoorStartDate)} </p>
                            </div>
                            : ""}
                        </div>

                        <div>{getMonthAndDate(plant.fallEarliestOutdoorStartDate) ? 
                            <p>Fall: {getMonthAndDate(plant.fallEarliestOutdoorStartDate)} - {getMonthAndDate(plant.fallLatestOutdoorStartDate)}</p> 
                            : ""}
                        </div>
                        
                    </div>
                    : ""}
                    </div>
                </div>
                <div className="plant-details-buttons">
                    {currentUser.id === plant.creatorId ? <button onClick={navToEditPlant}>Edit</button> : ""}
                    <button onClick={handleBackButton}>Back</button>
                </div>                                    
            </section>
        </div>
    )
}

export default PlantDetails;