import React, { Component, Fragment } from 'react';
import Header from './Header';
import DataTable from './DataTable';
import PopUp from './PopUp';
import ApiService from './ApiService';

class Autores extends Component {
  constructor(props) {
      super(props);

      this.state = {
          nomes: [
            ],
            titulo: 'Autores'
      };
  }

  componentDidMount(){
    ApiService.ListaNomes()
        .then(res => ApiService.TrataErros(res))
        .then(res => {
            if(res.message === 'success'){
            PopUp.exibeMensagem('success', 'Autores listados com sucesso')
            this.setState({nomes: [...this.state.nomes, ...res.data]})
            } 
        })
        .catch(err => PopUp.exibeMensagem('error', 'Falha na comunicação com a API ao listar os autores'));
  }

  render() {
      return (
          <Fragment>
              <Header />
              <div className='container'>
                  <h1>Página de Autores</h1>
                  <DataTable dados={this.state.nomes} titulo={this.state.titulo} colunas={['nome']}/>
              </div>
          </Fragment>
      );
  }
}

export default Autores;