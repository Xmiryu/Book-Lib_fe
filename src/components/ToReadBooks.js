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

function ToReadBooks(props) {
    const [error, setError] = useState(null);
    const [toReadBooks, setToReadBooks] = useState(null);

    const classes = useStyles();


    function logout(event) {
        event.preventDefault();
        localStorage.setItem('auth-token', null);
        props.history.push('/pikachu/login');
    }

    const getToReadData = async () => {
        try {
            const res = await axios.get(
                '/pikachu/getToRead', {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
            setToReadBooks(res.data);
            if (!toReadBooks) props.history.push('/pikachu');

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getToReadData();
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
            props.history.push('/pikachu/');

        } catch (err) {
            setError(err.response.data.message);
            console.log(error);
        }
    }

    async function deleteToRead(bookId) {
        try {
            await axios.delete(
                `pikachu/${bookId}`, {
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                }
            );
            setToReadBooks(null);
            await getToReadData();
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return toReadBooks && (
                <div className={classes.margin}>
                    <Button className={classes.buttons}
                            onClick={(event) => {
                                props.history.push("/pikachu");
                            }}>Books library</Button>
                    <Button className={classes.buttons}
                            onClick={(event) => {
                                props.history.push("/pikachu/getRead");
                            }}>Show read books</Button>
                    <Button className={classes.buttons}
                            onClick={(event) => {
                                props.history.push("/pikachu/addBook");
                            }}>Add new book</Button>
                    <Button className={classes.buttons}
                            onClick={event => logout(event)}>Logout</Button>
                    <br/>
                    <h2>Books to read:</h2>
                    <Divider />
                    {
                    toReadBooks.map((toReadBook) => {
                        return (
                            <div className={"booksToReadDiv"}>
                                <div className={"bookToReadDetails"}>
                                    <h3>{toReadBook.title}</h3>
                                    <p>{toReadBook.author}</p>
                                    <p>{toReadBook.year}</p>
                                </div>
                                <div className={"action2Buttons"}>
                                    <button onClick={event1 => addRead(toReadBook.id)}>Add to already read books</button>
                                    <button onClick={event1 => deleteToRead(toReadBook.id)}>Delete from 'to read'</button>
                                </div>
                                <Divider />
                            </div>
                        )
                    })
                }
            </div>
    );

}
export default ToReadBooks;
