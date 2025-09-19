import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlantTypeById } from "../../services/plantService";
import "./Plant.css"

function PlantDetails() {
    const [plant, setPlant] = useState({})
    const { id } = useParams()

   

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

    return (
        <div>
            <h1>Plant Details</h1>
            <section className="plant-details">
                <img className="plant-image" src={plant.imageURL} />

                <h2>{plant.name}</h2>

                <p>{plant.plantType.type}</p>

                <div>{getMonthAndDate(plant.earliestIndoorStartDate) ? 
                <div>
                    <p><strong>Start Seeds Indoors:</strong></p>
                    <p>{getMonthAndDate(plant.earliestIndoorStartDate)} - {getMonthAndDate(plant.latestIndoorStartDate)}</p></div> 
                    : ""}
                </div>
                
                <div>{plant.springEarliestOutdoorStartDate || plant.fallEarliestOutdoorStartDate ? 
                    <p><strong>Start Seeds Outdoors:</strong></p>
                    : ""
                }
                </div>

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
                <div>{plant.lastDateToPlant ? 
                    <p>Last date to plant: {getMonthAndDate(plant.lastDateToPlant)}</p>
                    : ""}
                </div>
                <div>{plant.lastDateToPlant ? 
                    <p>Average days to mature: {plant.averageDaysToMature}</p>
                    : ""}
                </div>
                <div>{plant.useStart ? 
                    <p>Starter plant recommended: {plant.useStart ? <span> Yes</span> : <span> No</span>}</p>
                    : ""}
                </div>
            </section>
        </div>
    )
}

export default PlantDetails;