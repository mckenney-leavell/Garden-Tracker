import { useEffect, useState } from "react";
import { savedPlantsService } from "../../services/plantService";
import SavedPlant from "./SavedPlant";

export const MyGarden = ( {currentUser} ) => {
    const [userSavedPlants, setUserSavedPlants] = useState([])

    useEffect(() => {
        console.log("useEffect running, currentUser is:", currentUser)
        
        if (!currentUser || !currentUser.id) {
            console.log("Skipping API call - user not ready")
            return
        }
        
        console.log("Making API call with user ID:", currentUser.id)
        savedPlantsService(currentUser.id)
            .then((plantArr) => {
                setUserSavedPlants(plantArr)
            })
    }, [currentUser])

    return (
        <div className="saved-plants-container">
            <h1>My Garden</h1>
            <article className="saved-plants">
                {userSavedPlants.map((savedPlantObj) => {
                    return <SavedPlant plant={savedPlantObj} key={savedPlantObj.id} />
                })}
            </article>
        </div>
    )
}