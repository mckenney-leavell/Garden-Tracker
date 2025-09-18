// create form with all plant info
// create post service for created plant
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { createPlantService, plantTypeService } from "../../services/plantService";
import "react-datepicker/dist/react-datepicker.css"

function CreatePlant( {currentUser} ) {
    const [allTypes, setAllTypes] = useState([])
    const [earliestIndoorStartDate, setEarliestIndoorStartDate] = useState("")
    const [latestIndoorStartDate, setLatestIndoorStartDate] = useState("")
    const [earliestSpringStartDate, setEarliestSpringStartDate] = useState("")     
    const [latestSpringStartDate, setLatestSpringStartDate] = useState("")  
    const [earliestFallStartDate, setEarliestFallStartDate] = useState("") 
    const [latestFallStartDate, setLatestFallStartDate] = useState("") 
    const [lastDateToPlant, setLastDateToPlant] = useState("")       
    const [plant, setPlant] = useState({
        name: "",
        plantTypeId: 0,
        earliestIndoorStartDate: "",
        latestIndoorStartDate: "",
        springEarliestOutdoorStartDate: "",
        springLatestOutdoorStartDate: "",
        fallEarliestOutdoorStartDate: "",
        fallLatestOutdoorStartDate: "",
        lastDateToPlant: "",
        averageDaysToMature: 0,
        useStart: false,
        companionPlants: null,
        imageURL: "",
        creatorId: currentUser.id
    })

    // const handleSaveToGarden = () => {
    //     const savedCreatedPlant = {
    //         plantId: plant.id,
    //         userId: currentUser?.id
    //     }

    //     savePlantToGarden(savedCreatedPlant).then(() => {
    //         console.log("Post Saved: ", savedCreatedPlant)
    //     })
    // }

    useEffect(() => {
        const allTypesService = plantTypeService()
        allTypesService.then((typesArr) => {
            setAllTypes(typesArr)
        })
    }, [])

    const handleSavePlant = (event) => {
        event.preventDefault()

        if (plant.name && plant.plantTypeId && plant.imageURL) {
            createPlantService(plant).then(() => {
                console.log("New post:", plant)
            })
            // handleSaveToGarden()

        } else {
            window.alert("Please include a plant name, type, and image URL")
        }
    }

    return (
        <form>
            <h1>Create Plant</h1>
            <fieldset>
                <label>Plant Name: </label>
                <input 
                    type="text"
                    placeholder="Type here"
                    onChange={(event) => {
                        const plantCopy = { ...plant }
                        plantCopy.name = event.target.value
                        setPlant(plantCopy)
                    }}
                />
            </fieldset>
            <fieldset>
                <label>Plant Type: </label>
                <select
                    onChange={(event) => {
                        const plantCopy = { ...plant };
                        plantCopy.plantTypeId = parseInt(event.target.value)
                        setPlant(plantCopy);
                }}>
                    <option value="null" className="type-option">Select Type</option>
                    {allTypes.map((type) => (
                        <option value={type.id} key={type.id} className="type-option">
                            {type.type}
                        </option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <label>Earliest Indoor Start Date: </label>
                <DatePicker selected={earliestIndoorStartDate} onChange={ (date) => {
                    setEarliestIndoorStartDate(date)
                    const plantCopy = { ...plant };
                    plantCopy.earliestIndoorStartDate = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset>
            <fieldset>
                <label>Latest Indoor Start Date: </label>
                <DatePicker selected={latestIndoorStartDate} onChange={ (date) => {
                    setLatestIndoorStartDate(date)
                    const plantCopy = { ...plant };
                    plantCopy.latestIndoorStartDate = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset>
             <fieldset>
                <label>Earliest Spring Start Date: </label>
                <DatePicker selected={earliestSpringStartDate} onChange={ (date) => {
                    setEarliestSpringStartDate(date)
                    const plantCopy = { ...plant };
                    plantCopy.springEarliestOutdoorStartDate = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset>
            <fieldset>
                <label>Latest Spring Start Date: </label>
                <DatePicker selected={latestSpringStartDate} onChange={ (date) => {
                    setLatestSpringStartDate(date)
                    const plantCopy = { ...plant };
                    plantCopy.springLatestOutdoorStartDate = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset>
            <fieldset>
                <label>Earliest Fall Start Date: </label>
                <DatePicker selected={earliestFallStartDate} onChange={ (date) => {
                    setEarliestFallStartDate(date)
                    const plantCopy = { ...plant };
                    plantCopy.fallEarliestOutdoorStartDate = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset>   
            <fieldset>
                <label>Latest Fall Start Date: </label>
                <DatePicker selected={latestFallStartDate} onChange={ (date) => {
                    setLatestFallStartDate(date)
                    const plantCopy = { ...plant };
                    plantCopy.fallLatestOutdoorStartDate = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset>  
            <fieldset>
                <label>Last Date to Plant: </label>
                <DatePicker selected={lastDateToPlant} onChange={ (date) => {
                    setLastDateToPlant(date)
                    const plantCopy = { ...plant };
                    plantCopy.lastDateToPlant = date.toISOString().split('T')[0]
                    setPlant(plantCopy);
                }} />
            </fieldset> 
            <fieldset>
                <label>Average Days to Mature After Planting: </label>
                <input 
                    type="number"
                    placeholder="Type here"
                    onChange={(event) => {
                        const plantCopy = { ...plant }
                        plantCopy.averageDaysToMature = parseInt(event.target.value)
                        setPlant(plantCopy)
                    }}
                />
            </fieldset>      
            <fieldset>
                <label>Using starter plant recommended? </label>
                <input 
                    label="starterPlant"
                    type="checkbox"
                    onClick={() => {
                        const plantCopy = { ...plant }
                        plantCopy.useStart = !plantCopy.useStart
                        setPlant(plantCopy)
                    }}
                />               
            </fieldset>   
            <fieldset>
                <label>Plant Image: </label>
                <input 
                    type="text"
                    placeholder="Add image URL"
                    onChange={(event) => {
                        const plantCopy = { ...plant }
                        plantCopy.imageURL = event.target.value
                        setPlant(plantCopy)
                    }}
                />
            </fieldset> 
            <fieldset>
                <button onClick={handleSavePlant}>Save Plant</button>
            </fieldset>                                                       
        </form>
    )
}

export default CreatePlant;