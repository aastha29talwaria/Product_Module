import React, { Component } from 'react';
import './App.css';
import Form from './components/Form/Form';
import ProductList from './components/ProductList/ProductList';
import Drawer from './components/Drawer/Drawer';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserSuccess } from './redux/actionCreators';


class App extends Component {

  render() {
    return (
      <Drawer>
        <Switch> 
          <Route exact path='/' render={props => <Form {...props} addUser={this.props.addUserSuccess} />}/>
          <Route path='/users' render={props => <ProductList {...props} />}/>
        </Switch>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUserSuccess: (user) => dispatch(addUserSuccess(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
