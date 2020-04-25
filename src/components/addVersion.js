import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import nextId from "react-id-generator";

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
        width: '30%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    datePicker: {
        width: '15%',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop:'15px',
    },
    button: {
        marginTop: '20px',
        marginLeft: '10px',
        height: '40px'
    },
});

class AddVersion extends Component {

    state = {
        id: null,
        versionName: '',
        startDate: null,
        endDate: null,
        description: '',
        progress: 0,
    }

    handleChange = name => event => {
        let id = nextId();
        this.setState({
          [name]: event.target.value,
          id: id,
        });
    };

    resetHandler(state){
        this.props.parentCallback(state);
        this.setState({
            versionName: '',
            description: '',
        })
        document.getElementById("create-version-form").reset();
    }

    render(){
        const { classes } = this.props;
        return(
            <div style={{position: "fixed", bottom: 0, width: "100%", marginLeft: "5%"}}>
                 <form id="create-version-form" className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Version Name"
                        className={classes.textField}
                        value={this.state.versionName}
                        onChange={this.handleChange('versionName')}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        defaultValue=""
                        onChange={this.handleChange('startDate')}
                        className={classes.datePicker}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        defaultValue=""
                        onChange={this.handleChange('endDate')}
                        className={classes.datePicker}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="outlined-name"
                        label="description"
                        className={classes.datePicker}
                        value={this.state.description}
                        onChange={this.handleChange('description')}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={() => this.resetHandler(this.state)}
                    >
                        Add
                    </Button>
                 </form>
            </div>
        )
    }
}

export default withStyles(styles)(AddVersion);
