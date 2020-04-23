import React from 'react';  
import './popUp.css'; 
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

class Popup extends React.Component {  
    state = {
        versionName: '',
        startDate: null,
        endDate: null,
        description: '',
        progress: 0,
    }

    componentDidMount(){
        console.log("modal data",this.props);
        this.setState({
            versionName: this.props.versionName,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            description: this.props.description,
            progress: this.props.progress,
        },()=>{console.log('pop up', this.state)});
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleSave = event => {
        const item = this.state;
        this.props.closePopup(item);
    }

    handleCancel = () => {
        this.props.cancel();
    }

    render() {  
        const { classes } = this.props;
        return (  
            <div className='popup'>  
                <div className='popupinner'> 
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
                    defaultValue={this.state.startDate}
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
                    defaultValue={this.state.endDate}
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
                <TextField
                    id="outlined-name"
                    label="progress"
                    type="number"
                    className={classes.datePicker}
                    value={this.state.progress}
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    onChange={this.handleChange('progress')}
                    margin="normal"
                    variant="outlined"
                />
                <br></br>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleSave}
                >
                    Save
                </Button>
                <Button 
                    variant="contained" 
                    color="warning" 
                    className={classes.button}
                    onClick={this.handleCancel}
                >
                    Cancel
                </Button>
                </div>  
            </div>  
        );  
    }  
}  

export default withStyles(styles)(Popup);