import React, {useEffect, useState} from 'react'
import {Route, Link, Routes, useParams, json} from 'react-router-dom';
const ItemView = () => {

    const params = useParams();
    const [product, setproduct] = useState({})

    const addtocart = async (e, productid)=>{
        console.log("here in addcart")
        console.log(productid)
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/addtocart",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },
            body : JSON.stringify({"productid" : productid})

        })

        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg)
        }
        console.log(resp)

    }

    const fetchProduct = async()=>{
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/getproduct",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
            },
            body : JSON.stringify({"productid" : params.productid})

        })

        const resp = await response.json();
        if (resp.success == "true") {
            resp.product = resp.product
            if (resp.product.pictures.length == 0) {
                resp.product.pictures.push({
                    img: "Nordic_stores/itemplaceholder_u5lfrf"
                })
            }
        }

        setproduct(resp.product)
    }

    useEffect(()=>{
        fetchProduct()
    })
  return (
    <div className="container my-10" style={{height:"100vh", display:"flex", alignItems:"center"}}>
        {product._id ? 
        <div className='row my-10' style={{height : "50vh"}}>
            <div className='col-md-6'>
            <div id="carouselExampleControls" class="carousel slide" data-mdb-ride="carousel">
  <div class="carousel-inner">
    {product.pictures.map((element, idx) =>{
        return <div class="carousel-item active">
        <img src={process.env.REACT_APP_CLOUDINARY_URL + element.img +".png"} class="d-block w-100" alt="Wild Landscape"/>
      </div>
    })}
    
  </div>
  <button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls" data-mdb-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
            </div>
            <div className='col-md-6'>
                <h2>{product.name}</h2>
                <p> {product.description}</p>
                <h2> INR <s> {product.org_price}</s> {product.price}</h2>

                <button class="btn btn-primary mx-3" onClick={event => {addtocart(event, product._id)}}>Buy</button>
            </div>
        </div>
        : <></>
        }
    </div>
  )
}

export default ItemView