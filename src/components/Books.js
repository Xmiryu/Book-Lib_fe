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

function Books(props) {
    const [error, setError] = useState(null);
    const [books, setBooks] = useState(null);

    const classes = useStyles();

    function logout(event) {
        event.preventDefault();
        localStorage.setItem('auth-token', null);
        props.history.push('/pikachu/login');
    }

    const getBookData = async () => {
        try {
            const res = await axios.get(
                '/pikachu', {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
            setBooks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getBookData();
    }, [])

    async function addRead(bookId) {
        try {
            await axios.put(
                `pikachu/addRead/${bookId}`, JSON.stringify(bookId),{
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
        } catch (err) {
            setError(err.response.data.message);
            console.log(error);
        }
    }

    async function addToRead(bookId) {
        try {
            await axios.put(
                `pikachu/addToRead/${bookId}`, JSON.stringify(bookId),{
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
        } catch (err) {
            console.error(err);
        }
    }

        return books && (
            <div className={classes.margin}>
                    <Button className={classes.buttons}
                            onClick={(event) => {
                        props.history.push("/pikachu/getRead");
                    }}>Show read books</Button>
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
                <h2>Books library:</h2>
                <Divider />

                {
                    books.map((book) => {
                        return (
                            <div className={"booksDiv"}>
                                <div className={"bookDetails"}>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                    <p>{book.year}</p>
                                </div>
                                <div className={"action1Buttons"}>
                                    <button onClick={event1 => addRead(book.id)}>Add to already read books</button>
                                    <button onClick={event1 => addToRead(book.id)}>Add to 'to read'</button>
                                </div>
                                <Divider />

                            </div>
                        )
                    })
                }
            </div>

    );

}
export default Books;
