import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import axios from 'axios';
import Navbar from './Navbar';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          loading: false
      }
  }

  showData = () => {
      console.log('método funcionando');
      this.setState({loading: true});
      axios.get("http://localhost:8000/data")
          .then(res => {
              console.log('categories', res.data)
              this.setState({loading: false});
          });
  };

  render() {
    let loadingImg;
    let btnBring;

    if (this.state.loading) {
        btnBring = <button className="btn btn-info" onClick={() => this.showData()} disabled>
                    obtener información
                   </button>

        loadingImg = <div>
                        <img src={require('../img/loading.gif')}/>
                     </div>
    } else {
        btnBring = <button className="btn btn-info" onClick={() => this.showData()}>
                    obtener información
                   </button>
        loadingImg = '';
    }
    return (
      <div className="App">
        <Navbar/>
        <div className="mt-4">
            {btnBring}
        </div>
        <div>
            {loadingImg}
        </div>
      </div>
    );
  }
}

export default App;
