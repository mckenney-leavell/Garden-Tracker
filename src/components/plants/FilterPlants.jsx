import { useEffect, useState } from "react";
import "./FilterBar.css"
import { plantTypeService } from "../../services/plantService";

function FilterPlants({ setSelectedTopic }) {
    const [plantTypes, setPlantTypes] = useState([])

    useEffect(() => {
        plantTypeService().then((plantTypeArr) => {
            setPlantTypes(plantTypeArr)
        })
    }, [])

    return (
        <div className="filter-bar">
            <div className="dropdown">
                <select  className="filter-plant-type" id="plant-type-dropdown" onChange={(event) => {setSelectedTopic(event.target.value)}}>
                    <option value={""} className="type-option">Filter by plant type</option>
                    {plantTypes.map((type) => 
                        <option value={type.id} key={type.id} className="type-option">{type.type}</option>
                    )}
                </select>
            </div>
        </div>
    )
}

export default FilterPlants;