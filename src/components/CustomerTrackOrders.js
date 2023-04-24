import React, {useEffect, useState} from 'react'
import {Route, Link, Routes, useParams, json} from 'react-router-dom';
const CustomerTrackOrders = () => {

    const params = useParams();
    console.log(params)
    const [delivery, setdelivery] = useState([])
    const [product, setproduct] = useState({pictures : []})
    const fetchDelivery = async ()=>{
        console.log("here")
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/fetchdelivery", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'signtoken': process.env.REACT_APP_SIGNTOKEN,
                'auth-token': localStorage.getItem("authtoken")
            },
            body : JSON.stringify({individ : params.orderid})

        })

        const response2 = await fetch(process.env.REACT_APP_BACKENDURL + "/api/getproduct",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
            },
            body : JSON.stringify({"productid" : params.productid})

        })


        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg)
        }
        else{
            setdelivery(resp.delivery)
            console.log(resp.delivery   )
            const resp2 = await response2.json()
            console.log(resp2)
            if(resp2.success == "false"){
                alert(resp.msg)
            }
            else{
                console.log(resp.product)
                setproduct(resp.product)
            }
        }
    }
    
    useEffect(()=>{
        fetchDelivery()
    }, [])     
  return (
    <div>
        
        <h2>Details of Order </h2>
        <div className='row'>
            <div className='col md-4'>
                    {/* <img src={product.pictures.length > 0 ?
                        <img
                        src={process.env.REACT_APP_CLOUDINARY_URL + product.pictures[0].img +".png"}
                        class="img-fluid rounded-3" />
                        :
                        <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3" />
                    }
                     class="rounded mx-auto d-block" alt="..."   /> */}
            </div>

            <div className='col md-8'>
                {
                    delivery.map((element, index)=>{
                        return <div>
                            <h6> {element.comment} </h6>
                            Item at
                            <p> {element.address1} , {element.address2}, {element.city} , {element.state}, {element.country} , {element.pincode}</p>
                        </div>
                    })
                }
            </div>
            
        </div>

    </div>
  )
}

export default CustomerTrackOrders