import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

class Box extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      srcs: [],
      alts: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  makeRequest(name){
    console.log(name)
    axios.get(`https://api.github.com/users/${name}`)
    .then(resp => {
      console.log(resp.data.login);
      this.state.alts.push(resp.data.login); 
      this.state.srcs.push(resp.data.avatar_url);
      this.setState({
      });
    })
    .catch(resp => {
      alert("Usuario não encontrado!")
      console.log(resp);
    })
  }

  handleChange(event){
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event){
    if(this.state.alts.includes(this.state.value) === false){
      this.makeRequest(this.state.value);
      this.setState({
        value: '',
      });
    } else {
      this.setState({
        value: '',
      });
      alert("USUARIO JÁ ADICIONADO");
    }
    event.preventDefault();
  }

  render(){
    return(
      <div id="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input id="text-entry" type="text" placeholder="USUARIO" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="enviar"/>
        </form> 
        <Users srcs={this.state.srcs} alts={this.state.alts}/>
      </div>
    );
  }
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alts: props.alts,
      srcs: props.srcs
    }
  }

  render(){
    return(
      <ul>
        {this.state.srcs.map((src, index) => 
          <li><img key={src} src={src} alt={this.state.alts[index]}/></li>
        )}
      </ul>
    );
  }
}

class App extends React.Component {
  render(){
    return(
      <Box/>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
