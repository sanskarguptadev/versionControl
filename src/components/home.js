import React, { Component } from 'react';
import AddVersion from './addVersion';
import VersionTable from './Table/versionTable';
import Header from '../components/Header/header';
class Home extends Component{
    state = {
        data : [],
    }
    deleteData = (id) => {
        const d = this.state.data;
        const items = d.filter(item => item.id !== id);
        this.setState({
            data: items, 
        })
    }

    saveData = (item, index) => {
         let data = this.state.data;
        data[index] = item;
        this.setState({  
            tableData: data,  
        }); 
    }
    
    callbackFunction = (childData) => {
        const updatedData = [...this.state.data, childData];
        this.setState({
            data: updatedData,
        }, () =>{console.log('parent',this.state)})
    }
    render(){
        let table = <div>Please add!!</div>;
        if(this.state.data.length != 0){
           table = <VersionTable delete={this.deleteData} data={this.state.data} save={this.saveData}/>
        }
        return(
            <div>
                <Header />
                {
                    table
                }
                <AddVersion parentCallback={this.callbackFunction}/>
            </div>

        )
    }
}

export default Home;