export const allPlantService = () => {
    return fetch ("http://localhost:8088/plants").then(res => res.json())
}

export const savedPlantsService = (userId) => {
    return fetch (`http://localhost:8088/savedPlant?userId=${userId}&_expand=plant`).then(res => res.json())
}

export const plantTypeService = () => {
    return fetch ("http://localhost:8088/plantTypes").then(res => res.json())
}

export const getPlantById = (id) => {
    return fetch (`http://localhost:8088/plants?id=${id}`).then(res => res.json())
}

export const getPlantTypeById = (id) => {
    return fetch (`http://localhost:8088/plants/${id}?_expand=plantType`).then(res => res.json())
}

export const getSavedPlantById = (id) => {
    return fetch (`http://localhost:8088/savedPlant/${id}`).then(res => res.json())
}

export const getPlantGrowingSeasons = () => {
    return fetch ("http://localhost:8088/plantingSeason").then(res => res.json())
}

export const getAssignedPlantSeasons = () => {
    return fetch("http://localhost:8088/assignedPlantingSeason").then(res => res.json())
}

export const savePlantToGarden = (savedPlant) => {
    return fetch ("http://localhost:8088/savedPlant", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(savedPlant)
    })
}

export const createPlantService = (plant) => {
    return fetch ("http://localhost:8088/plants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(plant)
    })
}

export const updatePlantService = (plant) => {
    return fetch (`http://localhost:8088/plants/${plant.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(plant)
    })
}

export const deletePlantService = (plantId) => {
    return fetch (`http://localhost:8088/plants/${plantId}`, {
        method: "DELETE"
    })
}

export const deleteSavedPlantService = (plantId) => {
    return fetch (`http://localhost:8088/savedPlant/${plantId}`, {
        method: "DELETE"
    })
}