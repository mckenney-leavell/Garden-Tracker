import { useEffect, useState } from "react";
import { savedPlantsService } from "../../services/plantService";
import SavedPlant from "./SavedPlant";

export const MyGarden = ( {currentUser} ) => {
    const [userSavedPlants, setUserSavedPlants] = useState([])

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

    return (
        <div className="saved-plants-container">
            <h1>My Garden</h1>
            <article className="saved-plants">
                {userSavedPlants.map((savedPlantObj) => {
                    return <SavedPlant getAndSetSavedPlants={getAndSetSavedPlants} plant={savedPlantObj} key={savedPlantObj.id} />
                })}
            </article>
        </div>
    )
}