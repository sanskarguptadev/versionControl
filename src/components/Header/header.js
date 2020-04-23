import React, { Component } from 'react';
import { grey } from '@material-ui/core/colors';

class Header extends Component{
    render(){
        return(
            <div style={{width: "100%",paddingRight: "80%", backgroundColor: "#D3D3D3"}}>
                <p style={{position: 'relative', top: '13px',right:'16px',fontSize: '10px'}}>Project / ENV1.5</p>
                <h3>Releases</h3>
            </div>
        )
    }
}
export default Header;