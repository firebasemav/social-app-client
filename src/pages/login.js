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
import { loginUser } from '../redux/actions/userActions';

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
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
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
                        <p className={classes.signup}>Don't have an account? <Link to="/signup"> Sign up</Link></p>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));