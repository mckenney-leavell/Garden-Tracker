// for each plant in the database, display a card with each plant name, picture, and button to save the plant to My Garden
// add useState for all plants
// add useEffect to set all plants to state and appear on initial render

import { useEffect, useState } from "react";
import { allPlantService } from "../../services/plantService";
import Plant from "./Plant";

function AllPlants() {
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => {
    allPlantService().then((plantArr) => {
      setAllPlants(plantArr);
    });
  }, []);

  return (
    <div className="plants-container">
      <h1>All Plants</h1>
      <article className="plants">
        {allPlants.map((plantObj) => {
          return <Plant plant={plantObj} key={plantObj.id} />;
        })}
      </article>
    </div>
  );
}

export default AllPlants;
