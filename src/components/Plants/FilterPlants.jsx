import { useEffect, useState } from "react";
import "./FilterBar.css"
import { getPlantGrowingSeasons, plantTypeService } from "../../services/plantService";

function FilterPlants({ setSelectedTopic }) {
    const [plantTypes, setPlantTypes] = useState([])
    const [plantSeasons, setPlantSeasons] = useState([])

    useEffect(() => {
        plantTypeService().then((plantTypeArr) => {
            setPlantTypes(plantTypeArr)
        })
    }, [])

    useEffect(() => {
        getPlantGrowingSeasons().then((seasonsArr) => {
            setPlantSeasons(seasonsArr)
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
            <div className="dropdown">
                <select className="filter-plant-season" id="plant-season-dropdown">
                    <option className="season-option">Filter by growing season</option>
                    {plantSeasons.map((season) =>
                        <option value={season.id} key={season.id} className="season-option">{season.season}</option>
                    )}
                </select>
            </div>
        </div>
    )
}

export default FilterPlants;