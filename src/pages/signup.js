import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import HangIcon from '../img/logo.PNG';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux

import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

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

class signup extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.grid}>
                <Grid item sm />
                <Grid item sm>
                    <img width="100" src={HangIcon} alt="Hang Icon" className={classes.image}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Sign up
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
                        <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.textField} 
                        helperText={errors.confirmPassword} 
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth  />
                        <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle" 
                        className={classes.textField} 
                        helperText={errors.handle} 
                        error={errors.handle ? true : false}
                        value={this.state.handle} 
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
                            >Sign up
                            {loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            )}</Button>
                        <p className={classes.signup}>Already have an account? <Link to="/login"> Login</Link></p>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));