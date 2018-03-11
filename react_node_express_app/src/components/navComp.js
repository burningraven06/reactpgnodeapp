import React from 'react';
// import { Route, BrowserRouter, NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const NavbarComp = (props) => {
   return (
      <nav className='navbar navbar-default'>
         <div className='container-fluid'>
            <div className='navbar-header'>
               <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-div" aria-expanded="false">
                  <span className="sr-only">Toggle Nav</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
               </button>
               <NavLink className="navbar-brand" to={"/"}>React App</NavLink>
            </div>
            <div className="collapse navbar-collapse" id="navbar-div">
               <ul className="nav navbar-nav ">
                  <li> <NavLink to={"/"} activeStyle={{ color: "#222" }}> Home </NavLink> </li>
                  <li> <NavLink to={"/cars"} activeStyle={{ color: "#222" }}> Cars </NavLink> </li>
                  <li> <NavLink to={"/about"} activeStyle={{ color: "darkgrey" }}> About</NavLink></li>
                  
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default NavbarComp;