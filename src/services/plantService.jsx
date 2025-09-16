export const allPlantService = () => {
    return fetch ("http://localhost:8088/plants").then(res => res.json())
}

export const savedPlantsService = (userId) => {
    return fetch (`http://localhost:8088/savedPlant?userId=${userId}&_expand=plant`).then(res => res.json())
}