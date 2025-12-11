import "./Profile.css"
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { allPlantService } from "../../services/plantService";
import UserCreatedPlants from "../plants/userPlants";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";

function Profile({ currentUser }) {

    const [user, setUser] = useState({})
    const [createdPlants, setCreatedPlants] = useState([])
    const [getSearchInput, setSearchInput] = useState("")
    const [filteredPlants, setFilteredPlants] = useState([])

    const navigate = useNavigate()

    const getAndSetCreatedPlants = () => {
        allPlantService().then((plantsArr) => {
            const userCreatedPlants = plantsArr.filter((plant) => plant.creatorId === user.id)
            setCreatedPlants(userCreatedPlants)
        })     
    }

    const navEditProfile = () => navigate("/profile/edit-profile")

    useEffect(() => {
        if (currentUser && currentUser.id) {
            getUserById(currentUser.id).then((data) => {
                const userObj = data[0]
                setUser(userObj)
            })
        }
    }, [currentUser])

    useEffect(() => {
        getAndSetCreatedPlants()
    }, [user])

    useEffect(() => {
        if (getSearchInput.length > 0) {
            const foundPlants = createdPlants.filter((plantObj) =>
                plantObj.name.toLowerCase().includes(getSearchInput.toLowerCase())
            )
            setFilteredPlants(foundPlants)
        } 
        else {
            setFilteredPlants(createdPlants)
        }
  }, [createdPlants, getSearchInput])

    return (
        <div id="profile">                       
            <div className="profile-content">
                <div className="profile-info">
                    <h1>My Profile</h1>
                    <div>
                        <h2>Profile Information</h2>
                        <div className="profile-name-email">
                            <div>Name: {user.name}</div>
                            <div>Email: {user.email}</div>
                        </div>
                    </div>
                    <button onClick={navEditProfile}>Edit Profile</button>
                </div>
                <div className="created-plants">
                    {createdPlants.length > 0 ?  
                        <>
                            <div className="created-plants-header">
                                <h2>Created Plants</h2> 
                                            
                                <SearchBar getSearchInput={getSearchInput} setSearchInput={setSearchInput}/>
                            </div>
                            <div className="plants">
                                {filteredPlants.map((plant) => {
                                    return <UserCreatedPlants plant={plant} key={plant.id} getAndSetCreatedPlants={getAndSetCreatedPlants}/>
                                })}               
                            </div>
                        </>
                    : ""}
                </div>
            </div>
        </div>
    )
}

export default Profile;