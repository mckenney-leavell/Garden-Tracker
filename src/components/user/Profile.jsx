import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { allPlantService } from "../../services/plantService";
import UserCreatedPlants from "../plants/userPlants";
// import UserCreatedPlants from "../plants/UserPlants";

function Profile({ currentUser }) {
    // if currentUser.id === user.id, then display the email, name, and plants the user created
    const [user, setUser] = useState({})
    const [allPlants, setAllPlants] = useState([])
    const [createdPlants, setCreatedPlants] = useState([])

    useEffect(() => {
        if (currentUser && currentUser.id) {
            getUserById(currentUser.id).then((data) => {
                const userObj = data[0]
                setUser(userObj)
            })
        }
    }, [currentUser])

    useEffect(() => {
        allPlantService().then((plantsArr) => {
            setAllPlants(plantsArr)
        const userCreatedPlants = allPlants.filter((plant) => plant.creatorId === user.id)
        setCreatedPlants(userCreatedPlants)
        })
    }, [allPlants, user])

    return (
        <div className="profile-info">
            <h1>My Profile</h1>
            <h2>Profile Information</h2>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <button>Edit Profile</button>
            <div className="created-plants">
                <h2>Created Plants</h2>
                {createdPlants.map((plant) => {
                    return <UserCreatedPlants plant={plant} key={plant.id}/>
                })}
            </div>
        </div>
    )
}

export default Profile;