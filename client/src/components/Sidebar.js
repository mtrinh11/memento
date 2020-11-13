import React, {Component} from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom'

 class Sidebar extends Component{
    constructor() {
        super()
        this.state = {
            collapsed: false,
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
                <h1 style={{textAlign:"center", textTransform:"uppercase" }} >{this.props.User.name}</h1>
            </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem>
                        <button style ={{width:"50%", position: "right"}}onClick={this.handleCollapsed}>collapse</button>
                    </MenuItem>
                    <MenuItem >         
                        <NavLink activeClassName="nav-active" to="/profile">
                            All Posts
                        </NavLink>
                    </MenuItem>
                    <MenuItem>
                        <NavLink activeClassName="nav-active" to="/profile/entry">
                            Create an Entry
                        </NavLink>
                    </MenuItem>
                    {/* <SubMenu title="Physical" >
                        <MenuItem>Diet</MenuItem>
                    </SubMenu>
                    <SubMenu title="Mental" >
                        <MenuItem>Habit Tracker</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu> */}
                </Menu>
            </ProSidebar>
        )
    }
}

export default Sidebar;