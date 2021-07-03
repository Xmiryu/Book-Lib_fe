import React, {useState} from "react";
import axios from './axios';
import {TextField, Button, FormControl, Input} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import '../App.css'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(2),
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
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [error, setError] = useState("");

    const classes = useStyles();

    function validateForm() {
        return title.length !== 0 && author.length !== 0;
    }

    async function handleAdding(event) {
        event.preventDefault();

        try {
            await axios.post(
                "/pikachu",
                JSON.stringify({
                    title: title,
                    author: author,
                    yearPublished: year
                }),
                {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
            props.history.push('/pikachu');
        } catch (err) {
            setError(err);
            console.error(error);
        }
    }
    return(
        <div className="addBook">
            <br/>
        <h3>Add a new book</h3>
            <form className={classes.margin} noValidate autoComplete="off" onSubmit={handleAdding}>
            <FormControl className={classes.margin}>
                <TextField className={classes.textField}
                           id="title" label={"Title"} type="title"  variant="outlined" onChange={(event) => {
                    setTitle(event.target.value);
                }}>
                </TextField>
                <TextField className={classes.textField}
                           id={"author"} label={"Author"} type="author" variant="outlined" onChange={(event) => {
                    setAuthor(event.target.value);
                }}>
                </TextField>
                <Input type="number" id={"yearPublished"} label={"Year Published"} variant="outlined" onChange={(event) => {
                    setYear(event.target.value);
                }}>
                </Input>

                <Button type="submit" className={classes.root} disabled={!validateForm()}>Add book</Button>
                <br />
                <Button onClick={(event) => {
                    props.history.push("/pikachu");
                }}>Go back</Button></FormControl>
            </form>
        </div>
    )

}