import React from 'react'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'

function Home(props)  {
    
   let goToListe = ()=>{
        props.history.push('/liste');
    }

    
        
        return(
            <div>
                <button onClick={()=>{goToListe()}}>MANAGE THE TEAMS</button>
            </div>
        )
    
}
export default Home;