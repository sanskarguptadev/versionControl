import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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

class EmployeeForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          task: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value
        });
    }
  
    handleSubmit(event) {
        event.preventDefault();
        const data = {
            'task' : this.state.task,
            'id': this.props.id,
        }
        this.props.parentCallback(data);
        this.setState({
            task: '',
        })
        event.target.reset();
    }
    
    render() {
      const { classes } = this.props;
      return (
        <div>
            <form onSubmit= {this.handleSubmit} style={{width: '100%'}} >
            <TextField
                id="outlined-name"
                label="Add"
                className={classes.textField}
                value={this.state.versionName}
                onChange={this.handleChange('task')}
                margin="normal"
                variant="outlined"
                autocomplete="off"
            />
            </form>
        </div>
      );
    }
  }

export default withStyles(styles)(EmployeeForm);