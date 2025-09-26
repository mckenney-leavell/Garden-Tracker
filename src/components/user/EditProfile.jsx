import { useEffect, useState } from "react";
import { getUserById, updateUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";

function EditProfile({ currentUser }) {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.id) {
      getUserById(currentUser.id).then((data) => {
        const userObj = data[0];
        setUser(userObj);
      });
    }
  }, [currentUser]);

  const handleSave = (event) => {
    event.preventDefault()

    if (user.name && user.email) {
      updateUserProfile(user).then(() => {
        console.log("Updated user:", user)
        navigate("/profile")
      })
    } else {
      window.alert("Please include a name and email")
    }  
  }

  return (
    <form>
      <h1>Edit Profile</h1>
      <div className="input-form">
        <fieldset>
          <label>Name: </label>
          <input
            type="text"
            value={user.name || ""}
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.name = event.target.value;
              setUser(userCopy);
            }}
          />
        </fieldset>
        <fieldset>
          <label>Email: </label>
          <input
            type="email"
            value={user.email || ""}
            onChange={(event) => {
              const userCopy = { ...user };
              userCopy.email = event.target.value;
              setUser(userCopy);
            }}
          />
        </fieldset>
        <fieldset>
          <button onClick={handleSave}>Save</button>
        </fieldset>
      </div>
    </form>
  );
}

export default EditProfile;
