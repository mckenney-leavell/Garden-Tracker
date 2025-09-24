import { useNavigate, useParams } from "react-router-dom";
import { getPlantById, plantTypeService, updatePlantService } from "../../services/plantService";
import { useEffect, useState } from "react";

function Editplant() {
    const [plantObj, setPlantObj] = useState({})
    const [allTypes, setAllTypes] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const plantId = parseInt(id)

    useEffect(() => {
        const allTypesService = plantTypeService()
        allTypesService.then((typesArr) => {
            setAllTypes(typesArr)
        })
    }, [])
    
    useEffect(() => {
        getPlantById(plantId).then((plantArr) => {
            if (plantArr && plantArr.length > 0) {
                setPlantObj(plantArr[0])
            }
        })
    }, [plantId])

    const handleUpdatePlant = (event) => {
            event.preventDefault()
            console.log("Button Clicked")

            const editedPlant = {
                name: plantObj.name,
                plantTypeId: plantObj.plantTypeId,
                earliestIndoorStartDate: plantObj.earliestIndoorStartDate,
                latestIndoorStartDate: plantObj.latestIndoorStartDate,
                springEarliestOutdoorStartDate: plantObj.springEarliestOutdoorStartDate,
                springLatestOutdoorStartDate: plantObj.springLatestOutdoorStartDate,
                fallEarliestOutdoorStartDate: plantObj.fallEarliestOutdoorStartDate,
                fallLatestOutdoorStartDate: plantObj.fallLatestOutdoorStartDate,
                lastDateToPlant: plantObj.lastDateToPlant,
                averageDaysToMature: plantObj.averageDaysToMature,
                useStart: plantObj.useStart,
                companionPlants: plantObj.companionPlants,
                imageURL: plantObj.imageURL,
                creatorId: plantObj.creatorId,
                id: plantObj.id
            }
    
            if (editedPlant.name && editedPlant.plantTypeId && editedPlant.imageURL) {
                updatePlantService(editedPlant).then(() => {
                    console.log("Updated plant:", editedPlant)
                    navigate("/profile")
                })
    
            } else {
                window.alert("Please include a plant name, type, and image URL")
            }
    }

    const handleCancel = () => navigate("/profile")


    return(
        <div>
            <form>
                <h1>Edit Plant</h1>
                <div className="input-form">
                <fieldset>
                    <label>Plant Name: </label>
                    <input 
                        type="text"
                        placeholder="Type here"
                        value={plantObj.name || ""}
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
                        value={plantObj.plantTypeId || ""}
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
                    <label>Average Days to Mature After planting: </label>
                    <input 
                        type="number"
                        placeholder="Type here"
                        value={plantObj.averageDaysToMature || ""}                    
                        onChange={(event) => {
                            const plantCopy = { ...plantObj }
                            plantCopy.averageDaysToMature = parseInt(event.target.value)
                            setPlantObj(plantCopy)
                        }}
                    />
                </fieldset>      
                <fieldset>
                    <label>Starter plant recommended? </label>
                    <input 
                        label="starterPlant"                         
                        type="checkbox"
                        checked={plantObj.useStart || false}
                        onChange={() => {
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
                        value={plantObj.imageURL || ""}
                        placeholder="Add image URL"
                        onChange={(event) => {
                            const plantCopy = { ...plantObj }
                            plantCopy.imageURL = event.target.value
                            setPlantObj(plantCopy)
                        }}
                    />
                </fieldset> 
                <fieldset>
                    <button onClick={handleUpdatePlant}>Save Changes</button>
                    <button onClick={handleCancel}>Cancel</button>
                </fieldset> 
                </div>
            </form>
        </div>
    )
}

export default Editplant;