import React, { useState, useEffect } from 'react'
import CustomerSidebar from './CustomerSidebar'
import { useNavigate } from "react-router-dom";
const ReturnRequests = () => {
    const [returns, setreturns] = useState([])
    let navigate = useNavigate();
    const onClick = async (e, retid) => {
        console.log("retid ==> ", retid)
        // start the return process
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/returnproduct/confirm", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'signtoken': process.env.REACT_APP_SIGNTOKEN,
                'auth-token': localStorage.getItem("authtoken")
            },
            body: JSON.stringify({ retid: retid })

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


    const findreturns = async () => {

        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/returnrequests", {

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

            var new_returns = []
            let obj = {}
            for await (obj of resp.returns) {
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
                    new_returns.push(obj)
                }
            }

            setreturns(new_returns)
        }

    }


    useEffect(() => {
        if (!localStorage.getItem("authtoken")) {
            alert("please login first")
            navigate("../login", { replace: true });
        }
        else {
            findreturns()
        }

    }, [returns])
    return (
        <div className="row" style={{ height: "100vh", overflowY: "auto" }}>
            <div className='col-md-4'>
                <CustomerSidebar></CustomerSidebar>
            </div>
            <div className="col-md-8 my-2" style={{ height: "100vh", overflowY: "auto" }}>
                {returns.map((element, idx) => {
                    return <div class="card mb-3" style={{ maxWidth: "50vw" }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={process.env.REACT_APP_CLOUDINARY_URL + element.product.pictures[0].img + ".png"} class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8 my-2">
                                <div class="card-body">
                                    <h5 class="card-title">{element.product.name}</h5>
                                    <p class="card-text">Qty : {element.quantity}</p>
                                    <p class="card-text">Per Piece Price : {element.product.price}</p>
                                    <p class="card-text">Total Amount : {element.payment}</p>
                                    <p class="card-text"><small class="text-body-secondary">Purchased on {element.createdAt}</small></p>
                                </div>
                                
                                <button type="button" class="btn btn-secondary" onClick={event => onClick(event, element._id)}>Accept Return Request</button>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default ReturnRequests