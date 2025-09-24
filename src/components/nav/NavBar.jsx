import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

function NavBar() {
	const navigate = useNavigate()

	const profileNav = () => navigate("/profile")
	const homeNav = () => navigate("/")

	function menuExpand() {
		let x = document.getElementById("nav-bar");
		if (x.className === "navbar") {
			x.className += " responsive";
		} else {
			x.className = "navbar";
		}
	}

	return (
		<nav id="nav-bar" className="navbar">
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
					className="fa fa-user-circle profile"
				>
				</button>
				<Link 
					className="text-only"
					to="/profile"
					onClick={profileNav}>
					Profile
				</Link>
			</div>
			{localStorage.getItem("plant_user") ? (
				<div className="navbar-item sign-out">
					<button
						to=""
						onClick={() => {
							localStorage.removeItem("plant_user")
							navigate("/", { replace: true })
						}}
						className="fa fa-sign-out"
					>
					</button>
					<Link 
						className="text-only"
						to=""
						onClick={() => {
							localStorage.removeItem("plant_user")
							navigate("/", { replace: true })
						}}>
						Sign Out
					</Link>
				</div>	
			) : (
				""
			)}
			<div className="navbar-item icon">
				<a href="javascript:void(0);" className="icon" onClick={menuExpand}>
					<i className="fa fa-bars"></i>
				</a>
			</div>
		</nav>
	)
}

export default NavBar;
