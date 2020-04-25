import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import PopUp from './popup/popUp';
import ProgressBar from 'react-bootstrap/ProgressBar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TaskInput from './expand/taskInput';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './versionTable.css';

class VersionTable extends Component{
    state = {
        requiredItem: null,
        show: false,
        modaldata: [],
        dataList: [],
        expand: false,
        expandId: null,
    }
   
    
    openModal = index => {
        this.setState({
            requiredItem: index,
            show: !this.state.show,
            modaldata: this.props.data[index],
        });
        
    }

    saveData = (item) => { 
        const requiredItem = this.state.requiredItem;
        this.setState({  
            show: !this.state.show,
        });  
        this.props.save(item, requiredItem);
    }

    deleteData = (id) => {
        this.props.delete(id);
    }

    cancel = () => {
        this.setState({
            show: !this.state.show,
        })
    }

    status = (progress) => {
        let result = null;
        console.log('status', progress);
        if(progress == 0){
            result = <span className='prg'>In Progress</span>;
        } else if(progress > 0 && progress < 100){
            result = <span className='unreleased'>Unreleased</span>;
        } else {
            result = <span className='released'>Released</span>
        }
        return result;
    }

    expandHandler = (index) =>{
        this.setState({
            expand: !this.state.expand,
            expandId: index,
        });
    }

    expandcallbackFunction = (childData) => {
        this.props.addExpandtask(childData);
    }

    render(){
        console.log(this.props.tasks);
        const list = this.props.data.map((d, index) => {
            return (
                <React.Fragment>
                    <tr key={d.id}>
                        <td>
                            {
                                this.state.expand && (this.state.expandId === index) ?
                                <ExpandMoreIcon onClick={() => this.expandHandler(index)} />
                                :
                                <ChevronRightIcon onClick={() => this.expandHandler(index)}/>
                            }
                            
                        </td>
                        <td>
                            {d.versionName}
                        </td>
                        <td> {this.status(d.progress)}</td>
                        <td><ProgressBar now={d.progress} /></td>
                        <td>{d.startDate}</td>
                        <td>{d.endDate}</td>
                        <td>{d.description}</td>
                        <td>
                            <EditIcon style={{cursor: 'pointer'}} onClick={() => this.openModal(index)}></EditIcon>
                            <DeleteIcon style={{cursor: 'pointer'}} onClick={() => this.deleteData(d.id)}></DeleteIcon>
                        </td>
                    </tr>
                    {
                    (this.state.expand) ? (index === this.state.expandId)? 
                    <tr>
                        <td></td>
                        <td style={{paddingTop: '40px'}}>Enter The tasks</td>
                        <td><TaskInput id={d.id} parentCallback={this.expandcallbackFunction}/></td>
                        <td>
                        {
                            this.props.tasks.map((item) =>{
                            return item.id === d.id? <ul><li>{item.task}</li></ul> : null
                            })
                        }
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    : null 
                    : null
                    }
                </React.Fragment>
            )
        });
       
        return(
            <div>
               <Table responsive className="professional">
                    <thead>
                        <tr className="head">
                            <th></th>
                            <th>Version</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           list
                        }
                    </tbody>
                </Table>
                {
                    this.state.show ?
                    <PopUp 
                        versionName={this.state.modaldata.versionName}
                        startDate={this.state.modaldata.startDate}
                        description={this.state.modaldata.description}
                        endDate={this.state.modaldata.endDate}
                        progress={this.state.modaldata.progress}
                        closePopup={this.saveData}
                        cancel={this.cancel}
                    />
                    :null
                }
            </div>
        )
    }
}

export default VersionTable;