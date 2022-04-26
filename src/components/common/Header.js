import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
	const [ mobileMenu, setMobileMenu ] = useState(false);

	const active = {
		textDecoration: "underline"
	};

	const activeMobile = {
		color: "pink"
	}

	return(
	<header>
		<div className="inner">
			<h1>
				<NavLink exact to="/">&lt;C-log/&gt;</NavLink>
			</h1>

			<div 
				className={mobileMenu ? "btnCall on" : "btnCall"} 
				onClick={()=> setMobileMenu(!mobileMenu)}
			>
				<span>메뉴호출</span>
			</div>
			
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
					<li><NavLink activeStyle={active} exact to="/">HOME</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/about">ABOUT</NavLink></li>
					<li><NavLink activeStyle={active} to="/blog">BLOG</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/gallery">GALLERY</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/playlist">PLAYLIST</NavLink></li>
					<li><NavLink activeStyle={active} exact to="/contact">CONTACT</NavLink></li>
				</ul>
			</nav>

			<nav className={mobileMenu ? "menuMobile on" : "menuMobile"}>
				<h1><NavLink exact to="/">&lt;C-log/&gt;</NavLink></h1>
				<ul id="gnbMobile">
					<li><NavLink activeStyle={activeMobile} exact to="/">HOME</NavLink></li>
					<li><NavLink activeStyle={activeMobile} exact to="/about">ABOUT</NavLink></li>
					<li><NavLink activeStyle={activeMobile} to="/blog">BLOG</NavLink></li>
					<li><NavLink activeStyle={activeMobile} exact to="/gallery">GALLERY</NavLink></li>
					<li><NavLink activeStyle={activeMobile} exact to="/playlist">PLAYLIST</NavLink></li>
					<li><NavLink activeStyle={activeMobile} exact to="/contact">CONTACT</NavLink></li>
				</ul>
			</nav>
		</div>
	</header>
	)
}

export default Header;