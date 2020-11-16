import React, {Component} from 'react';
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom';

 class Sidebar extends Component{
    constructor() {
        super()
        this.state = {
            collapsed: false,
        }
    }

    handleCollapsed = () => {
        this.setState({collapsed: !this.state.collapsed})
    }

    render(){
        return (
            <div style={{height:'100%vh'}}>
            <ProSidebar 
                width='100px'
                collapsed={this.state.collapsed}
            > 
                <SidebarHeader > 
                    <h1 style={{textAlign:"center", textTransform:"uppercase" }} >{this.props.User.name}</h1>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="square">
                    <MenuItem>
                        <p onClick={this.handleCollapsed}>
                            <i className="small material-icons" style={{fontSize: '20px', color: 'white', border:"none"}} >menu</i>
                        </p>
                    </MenuItem>
                    <MenuItem >         
                        <NavLink activeClassName="nav-active" to="/profile">
                            Entries
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink activeClassName="nav-active" to="/profile/entry">
                            Add Entry
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink activeClassName="nav-active" to="/profile/habits">
                            Habit Tracker
                        </NavLink>
                    </MenuItem>
                </Menu>
                </SidebarContent>
                <SidebarFooter>
                </SidebarFooter>
            </ProSidebar>
            </div>
        )
    }
}

export default Sidebar;