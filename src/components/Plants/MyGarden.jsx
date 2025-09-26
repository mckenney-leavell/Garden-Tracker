// import "./userSavedPlants.css"
import { useEffect, useState } from "react";
import { savedPlantsService } from "../../services/plantService";
import SavedPlant from "./SavedPlant";
import FilterPlants from "./FilterPlants";
import SearchBar from "../SearchBar";

export const MyGarden = ( {currentUser} ) => {
    const [userSavedPlants, setUserSavedPlants] = useState([])
    const [filteredPlants, setFilteredPlants] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([])
    const [getSearchInput, setSearchInput] = useState("")

    const getAndSetSavedPlants = () => {
        if (!currentUser || !currentUser.id) {
            return
        } 
        savedPlantsService(currentUser.id)
            .then((plantArr) => {
                setUserSavedPlants(plantArr)
            })
    }

    useEffect(() => {
        getAndSetSavedPlants()
    }, [currentUser])

    useEffect(() => {
        if (selectedTopic.length === 0 && getSearchInput.length > 0) {
        const foundPlants = userSavedPlants.filter((plantObj) =>
            plantObj.plant.name?.toLowerCase().includes(getSearchInput.toLowerCase())
        )
        setFilteredPlants(foundPlants)
        console.log("No plant type selected")
        } else if (getSearchInput.length === 0 && selectedTopic.length > 0) {
            console.log("Plant type selected")
            const filteredByPlantType = userSavedPlants.filter((plantObj) => 
            plantObj.plant.plantTypeId === parseInt(selectedTopic)
            )
            const foundPlants = filteredByPlantType.filter((plantObj) =>
            plantObj.plant.name?.toLowerCase().includes(getSearchInput.toLowerCase())
            )
            setFilteredPlants(foundPlants)
        } else if (getSearchInput.length > 0 && selectedTopic.length > 0) {
            console.log("Plant type selected")
            const filteredByPlantType = userSavedPlants.filter((plantObj) => 
            plantObj.plant.plantTypeId === parseInt(selectedTopic)
            )
            const foundPlants = filteredByPlantType.filter((plantObj) =>
            plantObj.plant.name?.toLowerCase().includes(getSearchInput.toLowerCase())
            )
            setFilteredPlants(foundPlants)
        } else {
            setFilteredPlants(userSavedPlants)
        }
    }, [userSavedPlants, getSearchInput, selectedTopic])    

    return (
        <div className="saved-plants-container">
            <div>
                <h1 className="page-title">My Garden</h1>
                <div className="page-filters">
                    <SearchBar getSearchInput={getSearchInput} setSearchInput={setSearchInput} />
                    <FilterPlants filteredPlants={setFilteredPlants} setSelectedTopic={setSelectedTopic}/>
                </div>
            </div>
            <article className="plants">
                {filteredPlants.map((savedPlantObj) => {
                    return <SavedPlant getAndSetSavedPlants={getAndSetSavedPlants} plant={savedPlantObj} key={savedPlantObj.id} />
                })}
            </article>
        </div>
    )
}