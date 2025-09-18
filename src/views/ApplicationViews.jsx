import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom"
import AllPlants from "../components/plants/AllPlants";
import NavBar from "../components/nav/NavBar";
import { MyGarden } from "../components/plants/MyGarden";
import CreatePlant from "../components/plants/CreatePlant";
import Profile from "../components/user/Profile";
import EditPlant from "../components/plants/EditPlant";

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
                <Route path="my-garden" element={<MyGarden currentUser={currentUser} />} />
                <Route path="create" element={<CreatePlant currentUser={currentUser} />} />
                <Route path="profile" >
                    <Route index element={<Profile currentUser={currentUser} />} />
                    <Route path="edit-plant/:id" element={<EditPlant />} />
                </Route>
            </Route>
        </Routes>
    )   
}

export default ApplicationViews;