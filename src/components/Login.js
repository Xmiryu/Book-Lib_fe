import React, {useState} from "react";
import axios from './axios';
import {TextField, Button, FormControl} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import '../App.css'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
        marginTop: '5%',
    },
    root: {
        marginTop: '10px',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        border: 0,
        fontSize: 16,
        borderRadius: 3,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    textField:{
        marginTop: theme.spacing(1),
    },
}));

export default function (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();


    function validateForm() {
        return email.length !== 0 && password.length !== 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let resp = await axios.post("pikachu/login", JSON.stringify({
                email: email,
                password: password
            }));
            localStorage.setItem('auth-token', resp.data);

            props.history.push('/pikachu');
        } catch (err) {
            console.error(err);
        }
    }
    return(
        <div className="Login">
            <form className={classes.margin} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <FormControl className={classes.margin}>
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

                <Button type="submit" className={classes.root} disabled={!validateForm()}>Login</Button>
                <br />
                <Button onClick={(event) => {
                    props.history.push("/pikachu/register");
                }}>Register</Button>
                </FormControl>
            </form>
        </div>
    )

}