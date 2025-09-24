import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom"
import AllPlants from "../components/Plants/AllPlants";
import NavBar from "../components/nav/NavBar";
import { MyGarden } from "../components/plants/MyGarden";
import CreatePlant from "../components/plants/CreatePlant";
import Profile from "../components/user/Profile";
import EditPlant from "../components/plants/EditPlant";
import EditProfile from "../components/user/EditProfile";
import PlantDetails from "../components/plants/PlantDetails";


function ApplicationViews() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const plantUser = localStorage.getItem("plant_user");
        const plantUserObject = JSON.parse(plantUser);

        setCurrentUser(plantUserObject);
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                    <NavBar />
                    <Outlet />
                    </>
                }
            >
                <Route index element={<AllPlants currentUser={currentUser}/>} />
                <Route path="plants">
                    <Route path="plant-details/:id" element={<PlantDetails />} />
                    <Route path="edit-plant/:id" element={<EditPlant />} />
                </Route>
                <Route path="my-garden" element={<MyGarden currentUser={currentUser} />} />
                <Route path="create" element={<CreatePlant currentUser={currentUser} />} />
                <Route path="profile" >
                    <Route index element={<Profile currentUser={currentUser} />} />                   
                    <Route path="edit-profile" element={<EditProfile currentUser={currentUser}/>} />
                </Route>
            </Route>
        </Routes>
    )   
}

export default ApplicationViews;