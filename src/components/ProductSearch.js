
import React, {useEffect, useState} from 'react'
import {Route, Link, Routes, useParams, json} from 'react-router-dom';


const ProductSearch = () => {

    const params = useParams();
    const [products, setproducts] = useState([])
    const fetchProduct = async () =>{
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/fetchproducts/searchitem",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },
            body : JSON.stringify({"searchword" : params.searchword})

        })

        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg)
            return 
        }
        console.log(resp)
        setproducts(resp.products)
        
    }

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

    useEffect(()=>{
        fetchProduct()
    })
    return (
        <div>
            
        <div className='container my-5'>
            <h2>Search from a range of Products</h2>
            <div class="row row-cols-1 row-cols-md-2 g-4 my-5">
                {products.map((element, idx) => {
                    return <div class="card mx-2 my-2" style={{ width: "18rem" }} key={idx}>
                        <img src={element.pictures.length ? process.env.REACT_APP_CLOUDINARY_URL + element.pictures[0].img+".png" : "https://archive.org/download/placeholder-image/placeholder-image.jpg"} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{element.name}</h5>
                            <p class="card-text">{element.description}</p>
                            <div className='container'> 
                            <button class="btn btn-primary mx-3" onClick={event => {addtocart(event, element._id)}}>Buy</button>
                            <a href={"/itemview/"+element._id}>
                            <button href="#" class="btn btn-secondary">View</button>
                            </a>
                            </div>
                        </div>
                    </div>
                })

                }

            </div>
        </div>
        </div>
    )
}

export default ProductSearch
