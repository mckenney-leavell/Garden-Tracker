import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

function NavBar() {
	const navigate = useNavigate()
	return (
		<ul className="nav-bar">
			<li className="navbar-item">
				<Link
					to="/"
					
				>
					All Plants
				</Link>
			</li>
			<li className="navbar-item">
				<Link
					to="/my-garden"
					
				>
					My Garden
				</Link>
			</li>
			<li className="navbar-item">
				<Link
					to="/create"
					
				>
					Create Plant
				</Link>
			</li>
			<li className="navbar-item">
				<Link
					to="/profile"
					
				>
					Profile
				</Link>
			</li>
			{localStorage.getItem("plant_user") ? (
				<li className="navbar-item">
					<Link
						to=""
						onClick={() => {
							localStorage.removeItem("plant_user")
							navigate("/", { replace: true })
						}}
						// className="navbar-link"
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
