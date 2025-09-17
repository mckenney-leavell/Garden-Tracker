export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`).then((res => res.json()))
}

export const getUserById = (id) => {
    return fetch (`http://localhost:8088/users?id=${id}`).then((res => res.json()))
}