import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import axios from 'axios';
import Navbar from './Navbar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          loading: false,
          books: [],
          categories: []
      }
  }

  componentDidMount() {
      axios.get("http://localhost:8000/api/books")
          .then(res => {
              this.setState({books: res.data});
          });

      axios.get("http://localhost:8000/api/categories")
          .then(res => {
              this.setState({categories: res.data});
          });
  }

    showData = () => {
      console.log('método funcionando');
      this.setState({loading: true});
      axios.get("http://localhost:8000/data")
          .then(res => {
              this.setState({loading: false});
         });

      axios.get("http://localhost:8000/api/books")
          .then(res => {
              this.setState({books: res.data});
          });

      axios.get("http://localhost:8000/api/categories")
          .then(res => {
              this.setState({categories: res.data});
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

    const columns = [
          {
            Header: "ID",
            accessor: "id"
          },
          {
            Header: "Category",
            accessor: "category"
          },
          {
            Header: "Price",
            accessor: "price"
          },
          {
            Header: "Product Description",
            accessor: "product_description"
          },
          {
            Header: "Stock",
            accessor: "stock"
          },
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Thumbnail",
            accessor: "thumbnail"
          },
          {
            Header: "UPC",
            accessor: "upc"
          }
      ];

    return (
      <div className="App">
        <Navbar/>
        <div className="mt-4 mb-4">
            {btnBring}
        </div>
        <div>
            {loadingImg}
        </div>
        <ReactTable columns={columns} data={this.state.books}>
        </ReactTable>
      </div>
    );
  }
}

export default App;
