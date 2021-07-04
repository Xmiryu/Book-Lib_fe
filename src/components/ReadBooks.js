import React, {useEffect, useState} from "react";
import axios from './axios';
import {Button, Divider} from "@material-ui/core";

import '../App.css'
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    margin:{
        marginTop: '8%',
    },
    buttons: {
        background: 'linear-gradient(45deg, #9795ef 30%, #f9c5d1 90%)',
        border: 0,
        fontSize: 16,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        margin: '4px',

    },

}));

function ReadBooks(props) {
    const [readBooks, setReadBooks] = useState(null);

    const classes = useStyles();

    function logout(event) {
        event.preventDefault();
        localStorage.setItem('auth-token', null);
        props.history.push('/pikachu/login');
    }

    const getReadData = async () => {
        try {
            const res = await axios.get(
                '/pikachu/getRead', {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
            setReadBooks(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getReadData();
    }, [])

    return (readBooks && (
        <div className={classes.margin}>
            <Button className={classes.buttons}
                    onClick={(event) => {
                        props.history.push("/pikachu/");
                    }}>Show library</Button>
            <Button className={classes.buttons}
                    onClick={(event) => {
                        props.history.push("/pikachu/getToRead");
                    }}>Show books to read</Button>
            <Button className={classes.buttons}
                    onClick={(event) => {
                        props.history.push("/pikachu/addBook");
                    }}>Add new book</Button>
            <Button className={classes.buttons}
                    onClick={event => logout(event)}>Logout</Button>
            <br/>
            <h2>Read books:</h2>
            <Divider />

            {
                    readBooks.map((readBook) => {
                        return (
                            <div className={"booksReadDiv"}>
                                <div className={"bookReadDetails"}>
                                    <h3>{readBook.title}</h3>
                                    <p>{readBook.author}</p>
                                    <p>{readBook.year}</p>
                                </div>
                                <Divider />
                            </div>

                    )
                    })
                }
            </div>
        )) || props.history.push('/pikachu');

}
export default ReadBooks;