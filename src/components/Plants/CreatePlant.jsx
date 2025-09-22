// create form with all plant info
// create post service for created plant
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { createPlantService, plantTypeService } from "../../services/plantService";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";

function CreatePlant( {currentUser} ) {
    const [allTypes, setAllTypes] = useState([])
          
    const [plantObj, setPlantObj] = useState({
        name: "",
        plantTypeId: 0,
        earliestIndoorStartDate: "",
        latestIndoorStartDate: "",
        springEarliestOutdoorStartDate: "",
        springLatestOutdoorStartDate: "",
        fallEarliestOutdoorStartDate: "",
        fallLatestOutdoorStartDate: "",
        lastDateToPlant: "",
        averageDaysToMature: null,
        useStart: false,
        companionPlants: null,
        imageURL: "",
        creatorId: currentUser.id
    })

    const navigate = useNavigate()

    useEffect(() => {
        const allTypesService = plantTypeService()
        allTypesService.then((typesArr) => {
            setAllTypes(typesArr)
        })
    }, [])

    const handleSavePlant = (event) => {
        event.preventDefault()

        if (plantObj.name && plantObj.plantTypeId && plantObj.imageURL) {
            createPlantService(plantObj).then(() => {
                navigate("/profile")
            })

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
                        const plantCopy = { ...plantObj }
                        plantCopy.name = event.target.value
                        setPlantObj(plantCopy)
                    }}
                />
            </fieldset>
            <fieldset>
                <label>Plant Type: </label>
                <select
                    onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.plantTypeId = parseInt(event.target.value)
                        setPlantObj(plantCopy);
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
                    <input type="date" name="earliest-indoor-start" value={plantObj.earliestIndoorStartDate || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.earliestIndoorStartDate = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
                <fieldset>
                    <label>Latest Indoor Start Date: </label>
                    <input type="date" name="latest-indoor-start" value={plantObj.latestIndoorStartDate || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.latestIndoorStartDate = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
               <fieldset>
                    <label>Earliest Spring Start Date: </label>
                    <input type="date" name="earliest-spring-start" value={plantObj.springEarliestOutdoorStartDate || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.springEarliestOutdoorStartDate = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
                 <fieldset>
                    <label>Latest Spring Start Date: </label>
                    <input type="date" name="latest-spring-start" value={plantObj.springLatestOutdoorStartDate || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.springLatestOutdoorStartDate = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
                <fieldset>
                    <label>Earliest Fall Start Date: </label>
                    <input type="date" name="earliest-fall-start" value={plantObj.fallEarliestOutdoorStartDate || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.fallEarliestOutdoorStartDate = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
                <fieldset>
                    <label>Latest Fall Start Date: </label>
                    <input type="date" name="latest-fall-start" value={plantObj.fallLatestOutdoorStartDate || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.fallLatestOutdoorStartDate = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
                <fieldset>
                    <label>Latest Date to Plant: </label>
                    <input type="date" name="latest-date-start" value={plantObj.lastDateToPlant || ""} onChange={(event) => {
                        const plantCopy = { ...plantObj };
                        plantCopy.lastDateToPlant = event.target.value
                        setPlantObj(plantCopy)
                    }}/>
                </fieldset>
            <fieldset>
                <label>Average Days to Mature After Planting: </label>
                <input 
                    type="number"
                    placeholder="Type here"
                    onChange={(event) => {
                        const plantCopy = { ...plantObj }
                        plantCopy.averageDaysToMature = parseInt(event.target.value)
                        setPlantObj(plantCopy)
                    }}
                />
            </fieldset>      
            <fieldset>
                <label>Using starter plant recommended? </label>
                <input 
                    label="starterPlant"
                    type="checkbox"
                    onClick={() => {
                        const plantCopy = { ...plantObj }
                        plantCopy.useStart = !plantCopy.useStart
                        setPlantObj(plantCopy)
                    }}
                />               
            </fieldset>   
            <fieldset>
                <label>Plant Image: </label>
                <input 
                    type="text"
                    placeholder="Add image URL"
                    onChange={(event) => {
                        const plantCopy = { ...plantObj }
                        plantCopy.imageURL = event.target.value
                        setPlantObj(plantCopy)
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