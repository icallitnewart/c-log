import { NavLink } from "react-router-dom";

function Header() {
	const active = {
		textDecoration: "underline"
	};

	return(
	<header>
		<div className="inner">
			<h1><NavLink exact to="/">&lt;C-log/&gt;</NavLink></h1>
			
			<nav className="menuWeb">
				<div className="profile">
					<div className="pic">
						<div className="pic2"></div>
					</div>
					<h2>Front-end Developer</h2>
					<span>@icallitnewart</span>
					<p>Welcome! I am an aspiring front-end developer and this is my coding blog. Feel free to look around!</p>
				</div>
				<ul id="gnb">
					<li><NavLink activeStyle={active} exact to="/about">ABOUT</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/blog">BLOG</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/gallery">GALLERY</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/playlist">PLAYLIST</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/contact">CONTACT</NavLink></li>
				</ul>
			</nav>
		</div>
	</header>
	)
}

export default Header;