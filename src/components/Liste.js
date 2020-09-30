import React from 'react'
// import {BrowserRouter as Router} from 'react-router-dom'

class Liste extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listes: [],
            equipe: ""
        } 
    }

    componentDidMount() {
        fetch("https://myteammanager.herokuapp.com/teams")
        .then((response) => { return response.json(); })
        .then((data) => { 
                          this.setState({listes: data.data}) ;
                          
        })
    }

    handleChange = (e)=>{
        this.setState({equipe: e.target.value});
        
    }
    
    addTeam = (e) => {
        //on ajoute l'equipe dans la bdd
        fetch("https://myteammanager.herokuapp.com/teams",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nom_equipe: this.state.equipe })
        })
        .then((response) => {return response.json()})
        .then((data) => {
            this.state.listes.push(data.data)
            this.setState({ equipe: "", listes: this.state.listes}) ;
           console.log(data);
        })
        .catch(function(res){ console.log(res) });
        
        
        
        // on recharge la liste des equipes
        // fetch("https://myteammanager.herokuapp.com/teams")
        // .then((response) => { return response.json(); })
        // .then((data) => { 
        //                   this.setState({listes: data.data, equipe: ""}) ;
        //                   console.log(this.state.listes);
                          
        // })

        
    }

    showTeam = (id)=>{
        this.props.history.push('/equipe/'+id)
    }
    
    render(){
        
        return(
            <div>
                <input value={this.state.equipe} type="text" onChange={this.handleChange} ></input>
                <button onClick={this.addTeam}>Ajouter une équipe</button>
                <h1>Liste des équipes:</h1>
                {this.state.listes.map((liste)=>{
                 return <h3 onClick={()=>{this.showTeam(liste.id_equipe)}}>{liste.nom_equipe}</h3>
              })}
              
                <button>
                    <a href="/"> Retour à l'accueil </a>
                </button>
              
              
            </div>
        )
    }
}
export default Liste;