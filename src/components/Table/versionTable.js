import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import PopUp from './popup/popUp';
import './versionTable.css';

class VersionTable extends Component{
    state = {
        requiredItem: null,
        show: false,
        modaldata: [],
    }
   
    
    openModal = index => {
        this.setState({
            requiredItem: index,
            show: !this.state.show,
            modaldata: this.props.data[index],
        }, () => {console.log('table', this.state.modaldata);});
        
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

    render(){
        const list = this.props.data.map((d, index) => {
            return(
                <tr key={d.id}>
                    <td>{d.versionName}</td>
                    <td> {this.status(d.progress)}</td>
                    <td>{d.progress}</td>
                    <td>{d.startDate}</td>
                    <td>{d.endDate}</td>
                    <td>{d.description}</td>
                    <td>
                        <button onClick={() => this.openModal(index)}>Edit</button>
                        <button onClick={() => this.deleteData(d.id)}>Delete</button>
                    </td>
                </tr>
            )
        });
       
        return(
            <div>
               <Table responsive className="professional">
                    <thead>
                        <tr className="head">
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