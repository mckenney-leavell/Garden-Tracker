import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";

function EditProfile({ currentUser }) {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (currentUser && currentUser.id) {
            getUserById(currentUser.id).then((data) => {
                const userObj = data[0]
                setUser(userObj)
            })
        }
    }, [currentUser])

    return (
        <form>
            <h1>Edit Profile</h1>
            <fieldset>
                <label>Name: </label>
                <input 
                    type="text"
                    value={user.name || ""}
                    onChange={(event) => {
                        const userCopy = {...user}
                        userCopy.name = event.target.value
                        setUser(userCopy)
                    }}
                />
            </fieldset>
            <fieldset>
                <label>Email: </label>
                <input 
                    type="email"
                    value={user.email || ""}
                    onChange={(event) => {
                        const userCopy = {...user}
                        userCopy.email = event.target.value
                        setUser(userCopy)
                    }}
                />
            </fieldset>
            <fieldset>
                <button>Save Changes</button>
            </fieldset>
        </form>
    )
}

export default EditProfile;