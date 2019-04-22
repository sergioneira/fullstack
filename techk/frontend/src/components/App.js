import React, { Component } from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import axios from 'axios';
import Navbar from './Navbar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Select from 'react-select';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          loading: false,
          books: [],
          categories: [],
          selectedOption: null
      }
  }

  componentDidMount() {
      axios.get("http://localhost:8000/api/books")
          .then(res => {
              console.log('books', res.data);
              this.setState({books: res.data});
          });

      axios.get("http://localhost:8000/api/categories")
          .then(res => {
              let c = [];

              res.data.forEach(ca => {
                  c.push({value: ca.id, label: ca.name});
              });

              this.setState({categories: c});
          });
  }

  handleChange = (selectedOption) => {
      this.setState({selectedOption});
  }

  deleteBook = (id) => {
      axios.delete("http://localhost:8000/api/books/" + id)
          .then(res => {
              console.log('deleted book ', res.data);
          });
  }

  showData = () => {
      this.setState({loading: true});
      axios.get("http://localhost:8000/data")
          .then(res => {
              this.setState({loading: false});
              document.location.reload(true);
         });

      axios.get("http://localhost:8000/api/books")
          .then(res => {
              this.setState({books: res.data});
          });

      axios.get("http://localhost:8000/api/categories")
          .then(res => {
              let c = [];

              res.data.forEach(ca => {
                  c.push({value: ca.id, label: ca.name});
              });

              this.setState({categories: c});
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
            accessor: "id",
            filterable: true
          },
          {
            Header: "Category",
            accessor: "category",
            filterable: true
          },
          {
            Header: "Price",
            accessor: "price",
            filterable: true
          },
          {
            Header: "Product Description",
            accessor: "product_description",
            filterable: true
          },
          {
            Header: "Stock",
            accessor: "stock",
            filterable: true
          },
          {
            Header: "Title",
            accessor: "title",
            filterable: true
          },
          {
            Header: "Thumbnail",
            accessor: "thumbnail",
            filterable: true
          },
          {
            Header: "UPC",
            accessor: "upc",
            filterable: true
          },
          {
            Header: "Action",
            Cell: props => {
                return (
                    <button className="btn btn-danger" onClick={() => this.deleteBook(4133)}>
                        Delete
                    </button>
                )
            },
            filterable: false
          }
      ];

    const {selectedOption} = this.state;

    return (
      <div className="App">
        <Navbar/>
        <div className="mt-4 mb-4">
            {btnBring}
        </div>
        <div>
            {loadingImg}
        </div>
        <div className="row">
            <div className="col-3">
                <Select value={selectedOption}
                    onChange={this.handleChange}
                    options={this.state.categories}
                    className="m-3"
                />
            </div>
        </div>
        <ReactTable columns={columns} data={this.state.books} filterable className="m-3">
        </ReactTable>
      </div>
    );
  }
}

export default App;
