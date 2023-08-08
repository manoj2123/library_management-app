import React, { useState } from 'react'
import {useHistory} from "react-router-dom";

const Base = ({title, description, children}) => {
    const history = useHistory();
    const [isNavExpanded, setIsNavExpanded] = useState(false)

  
  return (
    <div>
        <nav className="navigation">
      <a href="/" className="brand-name">
        Library Management
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* hamburger svg code... */}
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
          <button className="button" onClick={()=>history.push("/add")}>Add Books</button>
          </li>
          {/* <li>
            <a href="/about">Edit Books</a>
          </li>
          <li>
            <a href="/contact">Delete Books</a>
          </li> */}
        </ul>
      </div>
    </nav>
    <div>
        <header>
        <h1 className="heading">{title}</h1>
        </header>
        <main className="main-segment">
         <h2>{description}</h2>
         <div>
             {children}
         </div>
     </main>
    </div>
    </div>
  )
}

export default Base