import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from "@material-ui/core/Grid";
import './ProductList.css';
import { filterData, sortData } from "../../utils/productUtil";
import {node_server_address} from "../../config";
const classes = makeStyles({
  table: {
    minWidth: 650,
  },
});

class ProductList extends Component {

  state = {
    data: [],
    searchText: "",
    options: [
      "Name: Asc",
      "Name: Desc",
      "Price : Asc",
      "Price : Desc",
    ],
    nextEnable: true,
    previousEnabled: false,
    currentPage: 1,
    selectedOption:"Name: Asc"
  }
  FormRow(data, from, to) {
    let currentRowData = data ? data.slice(from, to) : [];
    return (
      <React.Fragment>
        {
          currentRowData.map(data => {
            return (
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <img
                    className={"imageInTable"}
                    src={"http://"+node_server_address+"/static/" + data.product_code} alt={"-"}
                  /><br/>
                  <span>Product Name:</span>
                  {` ${data.name}`}<br />
                  <span>Product Code:</span>
                  {` ${data.product_code}`}<br />
                  <span>Product Price:</span>
                  {` Rs. ${data.product_price}`}<br />
                  <span>Status: </span>
                  {` ${data.active_inactive}`}<br />
                </Paper>
              </Grid>
            )
          })
        }
      </React.Fragment>
    );
  }
  paginationHandle(evt) {
    let previousEnabled = true;
    let currentPage = this.state.currentPage;
    if (evt.target.value === "next") {
      if (currentPage % 3 === 0) {
        this.fetchData(currentPage * 9, (currentPage + 3) * 9)
      }
      currentPage = currentPage + 1;
    } else {
      if ((currentPage - 1) % 3 === 0) {
        this.fetchData((currentPage - 4) * 9, (currentPage - 1) * 9)
      }
      currentPage = currentPage - 1;
    }
    if (currentPage < 2) {
      previousEnabled = false;
    }
    this.setState({
      currentPage,
      previousEnabled
    });
  }
  fetchData(from, to) {
    if (!this.state.data.length) {
      fetch("http://"+node_server_address+"/getProductsList?from=" + from + "&to=" + to, {
        method: "GET"
      }).then(res => res.json()).then(data => {
        this.setState({
          data,
          nextEnable: (!data.data || !data.data.length)?false:true
        })
      }).catch((e) => { console.log(e) });
    }
  }
  componentDidMount() {
    this.fetchData(0, 29);
  }

  render() {
    let { data } = this.state;
    if (!data.status) {
      return <div><h1>Loading...</h1></div>
    } else if (!this.state.searchText) {
      data = data.data || []
    } else {
      data = filterData(data.data, this.state.searchText);
    }
    data = data.slice(((this.state.currentPage - 1) * 9), (this.state.currentPage * 9))
    data = sortData(data, this.state.selectedOption);
    debugger;
    return (
      <div>
        Sort By:
        <select
          className={"select_cls"}
          onChange={evt => {
            this.setState({
              selectedOption: evt.target.value
            })
          }}>
          {this.state.options.map(option => {
            return (<option key = {option}>{option}</option>)
          })}
        </select>
        <input
          type="text"
          className="searchField"
          value={this.state.searchText}
          placeholder={`Search by product name...`}
          onChange={evt => {
            this.setState({
              searchText: evt.target.value
            });
          }} />
        <div className={"pagination_cls"}>
          <button className={"previousButton"}
            disabled={!this.state.previousEnabled}
            onClick={evt => {
              this.paginationHandle(evt)
            }}
            value="previous"
          >
            Previous
          </button>
          <button disabled className={"previousButton"}>
            {this.state.currentPage}
          </button >
          <button className="nextButton"
            value="next"
            onClick={evt => {
              this.paginationHandle(evt)
            }}
            disabled={!this.state.nextEnable}
          >
            NEXT
          </button>
        </div>
        {data.length ?
          (<Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              {this.FormRow(data, 0, 3)}
            </Grid>
            <Grid container item xs={12} spacing={3}>
              {this.FormRow(data, 3, 6)}
            </Grid>
            <Grid container item xs={12} spacing={3}>
              {this.FormRow(data, 6, 9)}
            </Grid>
          </Grid>) :
          (<div className="NoData_cls">
            No More Data Found.Please, wait for new Stock.<br/>
            <img className={"imageInTable"} src={"http://"+node_server_address+"/static/nodataFound"} alt={"-"} />
            </div>)
        }
      </div>
    );
  }
}

export default ProductList;