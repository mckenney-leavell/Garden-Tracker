import "./AllPlants.css"
import { useEffect, useState } from "react";
import { allPlantService } from "../../services/plantService";
import Plant from "./Plant";
import FilterPlants from "./FilterPlants";
import SearchBar from "../SearchBar";

function AllPlants( {currentUser } ) {
  const [allPlants, setAllPlants] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([])
  const [filteredPlants, setFilteredPlants] = useState([])
  const [getSearchInput, setSearchInput] = useState("")

  const getAndSetAllPlants = () => {
    allPlantService().then((plantArr) => {
      setAllPlants(plantArr);
    })
  }

  useEffect(() => {
    getAndSetAllPlants();
  }, []);

  useEffect(() => {
    if (selectedTopic.length === 0 && getSearchInput.length > 0) {
      const foundPlants = allPlants.filter((plant) =>
        plant.name?.toLowerCase().includes(getSearchInput.toLowerCase())
      )
      setFilteredPlants(foundPlants)
      console.log("No plant type selected")
    } else if (getSearchInput.length === 0 && selectedTopic.length > 0) {
        console.log("Plant type selected")
        const filteredByPlantType = allPlants.filter((plant) => 
          plant.plantTypeId === parseInt(selectedTopic)
        )
        const foundPlants = filteredByPlantType.filter((plant) =>
          plant.name?.toLowerCase().includes(getSearchInput.toLowerCase())
        )
        setFilteredPlants(foundPlants)
    } else if (getSearchInput.length > 0 && selectedTopic.length > 0) {
        console.log("Plant type selected")
        const filteredByPlantType = allPlants.filter((plant) => 
          plant.plantTypeId === parseInt(selectedTopic)
        )
        const foundPlants = filteredByPlantType.filter((plant) =>
          plant.name?.toLowerCase().includes(getSearchInput.toLowerCase())
        )
        setFilteredPlants(foundPlants)
    } else {
      const allPlantsAlphaOrder = allPlants.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      setFilteredPlants(allPlantsAlphaOrder)
    }
  }, [allPlants, getSearchInput, selectedTopic])

  return (
    <div className="plants-container">
      <h1 className="title">All Plants</h1>
      <div className="page-filters"> 
        <SearchBar setSearchInput={setSearchInput} getSearchInput={getSearchInput}/>
        <FilterPlants filteredPlants={setFilteredPlants} setSelectedTopic={setSelectedTopic} />
      </div>
      <article className="plants">
        {filteredPlants.map((plantObj) => {
          return <Plant getAndSetAllPlants={getAndSetAllPlants} plant={plantObj} currentUser={currentUser} key={plantObj.id} />;
        })}
      </article>
    </div>
  );
}

export default AllPlants;
