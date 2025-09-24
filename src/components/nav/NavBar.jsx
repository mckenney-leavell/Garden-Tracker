import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

function NavBar() {
	const navigate = useNavigate()

	const profileNav = () => navigate("/profile")
	const homeNav = () => navigate("/")

	return (
		<nav id="nav-bar">
			<div className="navbar-item">
				<div 
					onClick={homeNav}
					className="home-button fa fa-leaf"
				/>
			</div>
			<div className="navbar-item">
				<Link
					to="/"
					
				>
					All Plants
				</Link>
			</div>
			<div className="navbar-item">
				<Link
					to="/my-garden"
					
				>
					My Garden
				</Link>
			</div>
			<div className="navbar-item">
				<Link
					to="/create"
					
				>
					Create Plant
				</Link>
			</div>
				<div className="navbar-item navbar-right">
					<button
						to="/profile"
						onClick={profileNav}
						className="fa fa-user-circle"
					/>
				</div>
				{localStorage.getItem("plant_user") ? (
					<div className="navbar-item">
						<button
							to=""
							onClick={() => {
								localStorage.removeItem("plant_user")
								navigate("/", { replace: true })
							}}
							className="fa fa-sign-out"
						/>
					</div>	
				) : (
					""
				)}
		</nav>
	)
}

export default NavBar;
