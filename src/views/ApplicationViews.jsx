import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom"
import AllPlants from "../components/Plants/AllPlants";
import NavBar from "../components/nav/NavBar";

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
            </Route>
        </Routes>
    )   
}

export default ApplicationViews;