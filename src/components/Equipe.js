import React from 'react'
import {BrowserRouter as Router, Redirect} from 'react-router-dom'

class Equipe extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                equipe : "",
                newName:""
            }
        }
        //----------------------------------------------------------------
        //Recuperer les données et les mettre dans le state afin de les afficher
        componentDidMount(){
            const handle = this.props.match.params ;
                
            fetch(`https://myteammanager.herokuapp.com/teams`)
            .then((response) => { return response.json(); })
            .then((data) => { 
                for(let i=0; i<data.data.length; i++){
                    
                    if (data.data[i].id_equipe == handle.id){
                        this.setState({equipe: data.data[i]});
                    } else{
                        
                    }
                } })
        
        }
        //-------------------------------------------------------------
        //recuperer le nouveau nom de l'equipe qui a été tapé et le mettre dans le state
        handleChange = (e)=>{
            this.setState({newName: e.target.value});
        }
        //---------------------------------------------
        //Methode pour modifier le nom de l'equipe
        handleRename = ()=>{
            //on envoie le nouveau nom de l'equipe
            fetch(`https://myteammanager.herokuapp.com/teams/${this.state.equipe.id_equipe}`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({nom_equipe: this.state.newName })
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
           console.log(data);
           let newTeam = this.state.equipe;
           newTeam.nom_equipe = this.state.newName;
           this.setState({equipe: newTeam, newName: ''})
         })
        
        
        }
        //----------------------------------------
        //Methode pour effacer une equipe
        handleDelete = ()=>{
            //on efface l'equipe
            
            fetch(`https://myteammanager.herokuapp.com/teams/${this.state.equipe.id_equipe}`,
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            
        })
        .then((response)=>{return response.json()})
        .then((data)=>{
            this.props.history.push('/liste');
         })
        .catch(function(res){  });
        //on redirige vers la liste des equipes
        
        }

    render(){
        
        return(
            <div>
                <input value={this.state.newName} type="text" onChange={this.handleChange}></input>
                <button onClick={()=>{this.handleRename()}}>Modifier</button>
                <button onClick={()=>{this.handleDelete()}}>Supprimer</button>
                <h3>{this.state.equipe.nom_equipe}</h3>
                <button><a href="/liste">Retour aux équipes</a></button>
            </div>
        )
    }
}
export default Equipe;