import React from 'react';
import axios from "axios";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import register from './components/register';
import Books from './components/Books';
import addBook from "./components/addBook";
import {AppBar, makeStyles, Typography} from "@material-ui/core";
import ToReadBooks from "./components/ToReadBooks";
import ReadBooks from "./components/ReadBooks";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:"5%",
    },
    bar:{
        background: 'linear-gradient(45deg, #0066EB 30%, #FF8AB3 90%)',
    },
    title: {
        flexGrow: 1,
        margin: "auto",
        padding: "10px",
        fontStyle: 'italic',

    },
}));



function App(props) {
    axios.defaults.headers = {
        "Content-Type": "application/json"
    }
    const classes = useStyles();

    return (
      <Router>
          <div className={classes.root}>
                <AppBar className={classes.bar}>
                    <Typography variant="h4" className={classes.title}>
                        Book-Lib
                    </Typography>
                </AppBar>
          </div>
          <div className="App">
            <Switch>
              <Route path='/pikachu' exact={true} component={Books}/>
            </Switch>
              <Switch>
                  <Route path='/pikachu/getRead' exact={true} component={ReadBooks}/>
              </Switch>
              <Switch>
                  <Route path='/pikachu/getToRead' exact={true} component={ToReadBooks}/>
              </Switch>
            <Switch>
              <Route path="/" exact component={Login}/>
              <Route path='/pikachu/login' exact={true} component={Login}/>
            </Switch>
            <Switch>
              <Route path='/pikachu/register' exact={true} component={register}/>
            </Switch>
              <Switch>
                  <Route path='/pikachu/addBook' exact={true} component={addBook}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
