import React, { useState, useEffect } from 'react'
import CustomerSidebar from './CustomerSidebar'
import { useNavigate } from "react-router-dom";
const CustomerOrders = () => {
    const [orders, setorders] = useState([])
    let navigate = useNavigate();
    const onClick = async(e, orderid)=>{
        // start the return process
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/returnproduct/ini", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'signtoken': process.env.REACT_APP_SIGNTOKEN,
                'auth-token': localStorage.getItem("authtoken")
            },
            body : JSON.stringify({orderid : orderid})

        })


        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg)
        }
        else{
            alert(resp.msg)
            console.log(resp)
        }
    }


    const findOrders = async () => {

        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/customer/showorders", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'signtoken': process.env.REACT_APP_SIGNTOKEN,
                'auth-token': localStorage.getItem("authtoken")
            },

        })


        const resp = await response.json()
        if (resp.success == "false") {
            alert(resp.msg)
        }
        else {

            var new_orders = []
            let obj = {}
            for await (obj of resp.orders) {
                const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/getproduct", {

                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'signtoken': process.env.REACT_APP_SIGNTOKEN,
                    },
                    body: JSON.stringify({ "productid": obj.productid })

                })

                const resp = await response.json();
                // console.log(resp)
                if (resp.success == "true") {
                    obj.product = resp.product
                    if (obj.product.pictures.length == 0) {
                        obj.product.pictures.push({
                            img: "Nordic_stores/itemplaceholder_u5lfrf"
                        })
                    }

                    obj.createdAt = new Date(obj.createdAt).toString()
                    new_orders.push(obj)
                }
            }

            setorders(new_orders)
        }

    }


    useEffect(() => {
        if (!localStorage.getItem("authtoken")) {
            alert("please login first")
            navigate("../login", { replace: true });
        }
        else {
            findOrders()
        }

    }, [])
    return (
        <div className="row" style={{ height: "100vh", overflowY: "auto" }}>
            <div className='col-md-4'>
                <CustomerSidebar></CustomerSidebar>
            </div>
            <div className="col-md-8 my-2" style={{ height: "100vh", overflowY: "auto" }}>
                {orders.map((element, idx) => {
                    return <div class="card mb-3" style={{ maxWidth: "50vw" }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={process.env.REACT_APP_CLOUDINARY_URL + element.product.pictures[0].img +".png"} class="img-fluid rounded-start" alt="..."  />
                            </div>
                            <div class="col-md-8 my-2">
                                <div class="card-body">
                                    <h5 class="card-title">{element.product.name}</h5>
                                    <p class="card-text">Qty : {element.quantity}</p>
                                    <p class="card-text">Type : {element.type}</p>
                                    <p class="card-text"><small class="text-body-secondary">Purchased on {element.createdAt}</small></p>
                                </div>
                                <a href = {"/customer/"+element.productid+"/"+element._id}>
                                <button type="button" class="btn btn-primary mx-2">Track Order</button>
                                </a>
                                { element.type == "order" ?
                                <button type="button" class="btn btn-secondary" onClick={event => onClick(event, element._id)}>Request Return</button>
                                :
                                 <></>   }
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default CustomerOrders