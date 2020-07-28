import React, {Component, Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css'
import Tabela from './Tabela';
import Form from './Formulario';
import Header from './Header';
import PopUp from './PopUp';
import ApiService from './ApiService';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autores: [],
    };
  }

  removeAutor = id =>{
    const { autores } = this.state;
  
    this.setState( 
      {
        autores : autores.filter((autor) => {
            return autor.id !== id;
        }),
      }
    );
    ApiService.RemoveAutor(id);
    PopUp.exibeMensagem('error', "Autor removido com sucesso");
  } 

  escutadorDeSubmit = autor => {
    ApiService.CriaAutor(JSON.stringify(autor))
      .then(res => res.data)
      .then(autor => {
        this.setState({ autores:[...this.state.autores, autor]});
        PopUp.exibeMensagem('success', "Autor adicionado com sucesso");
      });
  }
  

  componentDidMount(){
    ApiService.ListaAutores()
      .then(res => {
          this.setState({autores: [...this.state.autores, ...res.data]})
      });
  }
  
  render() {

    ApiService.ListaLivros()
    .then(res => console.log(res.data));

    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <h1>Casa do Código</h1>
          <Tabela autores = { this.state.autores } removeAutor = { this.removeAutor } />
          <Form escutadorDeSubmit={this.escutadorDeSubmit}/>
        </div>
      </Fragment>
    );
  }
}

export default App;
