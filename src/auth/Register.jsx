import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../services/userService";

function Register() {
    const [user, setUser] = useState({
        email: "",
        name: "",
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        createUser(user).then((createdUser) => {
        if (createdUser.id) {
            localStorage.setItem(
            "plant_user",
            JSON.stringify({
                id: createdUser.id,
            })
            )
            navigate("/")
        }
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        getUserByEmail(user.email).then((response) => {
        if (response.length > 0) {
            // Duplicate email. No good.
            window.alert("Account with that email address already exists")
        } else {
            // Good email, create user.
            registerNewUser()
        }
        })
    }

    const updateCustomer = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }
    return (
    <main style={{ textAlign: "center" }}>
        <section>
            <form className="input-form" onSubmit={handleRegister}>
                <h1 className="header">Welcome!</h1>
                <h2>Please register</h2>
                <fieldset>
                <div className="form-group">
                    <input
                    onChange={updateCustomer}
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                    autoFocus
                    />
                </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <input
                    onChange={updateCustomer}
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    required
                    />
                </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                    <button className="login-btn btn-info" type="submit">
                    Register
                    </button>
                </div>
                </fieldset>
            
            <section className="login-link">
                <p>Already registered? <Link to="/login">Login</Link></p>
            </section>
        </form>
        </section>
    </main>
    )
}

export default Register;