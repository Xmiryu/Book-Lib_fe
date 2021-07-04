import React, {useState} from "react";
import axios from './axios';
import {TextField, Button, FormControl} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import '../App.css'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
        marginTop: '9%',
    },
    root: {
        marginTop: '10px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        fontSize: 16,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    textField:{
        marginTop: theme.spacing(1),
    },
}));


export default function (props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();


    function validateForm() {
        return name.length !== 0 && surname.length !== 0 && email.length !== 0 && password.length !== 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await axios.post(
                "/pikachu/register",
                JSON.stringify({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password
                })
            );
            props.history.push("/pikachu/login");
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <div className="Register">

            <form className={classes.margin} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl>
                <TextField className={classes.textField}
                           id="name" label={"Name"} type="text" variant="outlined" onChange={(event) => {
                    setName(event.target.value);
                }}>
                </TextField>
                <TextField className={classes.textField}
                           id="surname" label={"Surname"} type="text" variant="outlined" onChange={(event) => {
                    setSurname(event.target.value);
                }}>
                </TextField>
                <TextField className={classes.textField}
                           id="email" label={"E-mail"} type="email"  variant="outlined" onChange={(event) => {
                    setEmail(event.target.value);
                }}>
                </TextField>
                <TextField className={classes.textField}
                           id={"password"} label={"Password"} type="password" variant="outlined" onChange={(event) => {
                    setPassword(event.target.value);
                }}>
                </TextField>
                <Button type="submit" className={classes.root} disabled={!validateForm()}>Register</Button>
                <br />
                <Button onClick={(event) => {
                    props.history.push("/pikachu/login");
                }}>Login</Button>
                </FormControl>
            </form>
        </div>
    )

}