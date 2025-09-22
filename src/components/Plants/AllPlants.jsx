import "./AllPlants.css"
import { useEffect, useState } from "react";
import { allPlantService } from "../../services/plantService";
import Plant from "./Plant";
import FilterPlants from "./FilterPlants";
import SearchBar from "../SearchBar";

function AllPlants( {currentUser } ) {
  const [allPlants, setAllPlants] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState([])
  // const [selectedSeason, setSelectedSeason] = useState([])
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
    if (Number.isInteger(parseInt(selectedTopic))) {
      const filteredByPlantType = allPlants.filter((plant) => 
          plant.plantTypeId === parseInt(selectedTopic))
      setFilteredPlants(filteredByPlantType)
    } else if (getSearchInput.length > 0) {
      const foundPlants = allPlants.filter((plant) =>
        plant.name.toLowerCase().includes(getSearchInput.toLowerCase())
      )
      setFilteredPlants(foundPlants)
    } 
    // else if (Number.isInteger(parseInt(selectedSeason))) {
    //   const filteredByPlantSeason = allPlants.filter((plant) => 
    //     plant.
    //   )
    // }
    else {
      setFilteredPlants(allPlants)
    }
  }, [allPlants, selectedTopic, getSearchInput])

  return (
    <div className="plants-container">
      <h1>All Plants</h1>
      <SearchBar setSearchInput={setSearchInput} getSearchInput={getSearchInput}/>
      <FilterPlants setSelectedTopic={setSelectedTopic} />
      <article className="plants">
        {filteredPlants.map((plantObj) => {
          return <Plant getAndSetAllPlants={getAndSetAllPlants} plant={plantObj} currentUser={currentUser} key={plantObj.id} />;
        })}
      </article>
    </div>
  );
}

export default AllPlants;
