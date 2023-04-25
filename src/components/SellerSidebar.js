import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const SellerSidebar = () => {
    return (
        <div  style={{ minHeight: "100vh" }}>
            <Sidebar
            style={{height : "100vh"}}
                image='https://images.unsplash.com/photo-1613425293967-16ae72140466?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop"'
            >
                <Menu>
                    <MenuItem component={<Link to="/seller/orders" />}> My Orders</MenuItem>
                    <MenuItem component={<Link to="/seller/returnrequests" />}> Return Requests</MenuItem>
                    <MenuItem component={<Link to="/seller/productadd" />}> Feedback</MenuItem>
                    <MenuItem component={<Link to="/seller/adpage" />}> Ad Advertisement</MenuItem>
                    
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SellerSidebar