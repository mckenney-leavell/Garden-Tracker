import { useEffect, useState } from "react";
import "./FilterBar.css"
import { getPlantGrowingSeasons, plantTypeService } from "../../services/plantService";

function FilterPlants({ setSelectedTopic, setSortedPlants, filteredPlants }) {
    const [plantTypes, setPlantTypes] = useState([])

    useEffect(() => {
        plantTypeService().then((plantTypeArr) => {
            setPlantTypes(plantTypeArr)
        })
    }, [])

    return (
        <div className="filter-bar">
            <div className="dropdown">
                <select className="filter-plant-type" id="plant-type-dropdown" onChange={(event) => {setSelectedTopic(event.target.value)}}>
                    <option className="type-option">Filter by plant type</option>
                    {plantTypes.map((type) => 
                        <option value={type.id} key={type.id} className="type-option">{type.type}</option>
                    )}
                </select>
            </div>
            {/* <div className="dropdown">
                <select className="filter-plant-date" id="plant-date-dropdown">
                    <option className="sort-date">Filter by last day to plant</option>
                    <option className="sort-date" onChange={() => {filteredPlants.sort((a, b) => a.lastDateToPlant - b.lastDateToPlant)}}>Sort by earliest to latest</option>
                    <option className="sort-date" onChange={() => {filteredPlants.sort((a, b) => b.lastDateToPlant - a.lastDateToPlant)}}>Sort by latest to earliest</option>
                </select>
            </div> */}
        </div>
    )
}

export default FilterPlants;