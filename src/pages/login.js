import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import HangIcon from '../img/logo.PNG';
import axios from 'axios';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import signup from './signup';
import { relative } from 'path';

const styles = {
    grid: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    form: {
        margin: '20px auto 20px auto'
    },
    textField: {
        margin: '10px auto'
    },
    button: {
        padding: '8px',
        fontSize: '16px',
        position: 'relative'
    },
    customError: {
        fontSize: '14px',
        padding: '10px',
        backgroundColor: '#de3b3b',
        color: '#fff',
        marginBottom: '10px',
        borderRadius: '4px'
    },
    signup: {
        margin: '20px auto'
    },
    progress: {
        position: 'absolute'
    }
}

class login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                });
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.grid}>
                <Grid item sm />
                <Grid item sm>
                    <img width="100" src={HangIcon} alt="Hang Icon" className={classes.image}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Hang with us
                    </Typography>
                    <form onSubmit={this.handleSubmit} noValidate className={classes.form} >
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}  
                            helperText={errors.email} 
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth />
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField} 
                            helperText={errors.password} 
                            error={errors.password ? true : false}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth  />
                        {errors.general && (
                            <Typography variant="subtitle1" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className={classes.button} 
                            disabled={loading}
                            fullWidth
                            >Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}</Button>
                        <p className={classes.signup}>Don't have an account? <Link to="/signup" component={signup}> Sign up</Link></p>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);