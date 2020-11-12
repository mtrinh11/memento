import React, {Component} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

 class Sidebar extends Component{
    constructor() {
        super()
        this.state = {
            collapsed: false
        }
    }

    handleCollapsed = () => {
        // console.log(this.state)
        this.setState({collapsed: !this.state.collapsed})
    }

    render(){
        return (
            <ProSidebar 
                collapsed={this.state.collapsed}
            > 
            <SidebarHeader > 
                <h1 style={{textAlign:"center"}} >Hello</h1>
            </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem > Big Picture</MenuItem>
                    <SubMenu title="Physical" >
                        <MenuItem>Diet</MenuItem>
                        <MenuItem>Sleep</MenuItem>
                        <button>add</button>
                    </SubMenu>
                    <SubMenu title="Mental" >
                        <MenuItem>Habit Tracker</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
                <button onClick={this.handleCollapsed}>collapse</button>
            </ProSidebar>
        )
    }
}

export default Sidebar;