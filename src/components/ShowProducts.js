import React, { useEffect, useState } from 'react'

const ShowProducts = () => {

    const [products, setproducts] = useState([])

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

    const fecthProducts = async () => {
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/fetchproducts", {

            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'signtoken': process.env.REACT_APP_SIGNTOKEN,
            },

        })

        const resp = await response.json();
        console.log(resp)
        if (resp.success == "false") {
            // show an alert that you haven't logged in or something else happened
            alert(resp.msg)
            return
        }

        console.log(resp.products)
        setproducts(resp.products)
    }
    useEffect(() => {
        fecthProducts()
    }, [])
    return (
    
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
    )
}

export default ShowProducts