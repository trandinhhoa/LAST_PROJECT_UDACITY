import React from 'react'
import {NavLink} from 'react-router-dom'
import SignOut from './SignOut'
import '../css/Nav.css'

export default function Nav(){
    return(
        <nav className='NavContainer'>
            <ul className='NavContentt'>
                <li className='NavLinkli'>
                    <NavLink className='NavLinkContent' to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li className='NavLinkli'>
                    <NavLink className='NavLinkContent' to='/add' exact activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li className='NavLinkli'>
                    <NavLink  className='NavLinkContent' to='/leaderboard' exact activeClassName='active'>
                        LeaderBoard
                    </NavLink>
                </li>
                <li>
                    <SignOut />
                </li>
            </ul>
        </nav>
    )
}