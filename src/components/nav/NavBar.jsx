import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

function NavBar() {
	const navigate = useNavigate()
	return (
		<ul className="nav-bar">
			<li>
				<Link
					to="/"
					className="navbar-item"
				>
					All Plants
				</Link>
			</li>
			<li>
				<Link
					to="/my-garden"
					className="navbar-item"
				>
					My Garden
				</Link>
			</li>
			<li>
				<Link
					to="/create"
					className="navbar-item"
				>
					Create Plant
				</Link>
			</li>
			<li>
				<Link
					to="/profile"
					className="navbar-item"
				>
					Profile
				</Link>
			</li>
			{localStorage.getItem("plant_user") ? (
				<li className="navbar-logout">
					<Link
						to=""
						onClick={() => {
							localStorage.removeItem("plant_user")
							navigate("/", { replace: true })
						}}
						className="navbar-link"
					>
						Logout
					</Link>
				</li>
			) : (
				""
			)}
		</ul>
	)
}

export default NavBar;
