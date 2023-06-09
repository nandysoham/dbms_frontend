import React,{useState, useEffect} from 'react'
import { json } from 'react-router-dom'

const Cart = () => {
    const [cart, setcart] = useState([])
    const [change, setchange] = useState(false)
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
        console.log(resp)

    }

    const removeone = async (e, productid)=>{
        e.preventDefault();
        console.log(e.target.name)
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/removeonefromcart",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },
            body : JSON.stringify({"productid" : productid})

        })

        const resp = await response.json()
        console.log(resp)
    }

    const fetchCart = async ()=>{
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/getcart",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },

        })

        const resp = await response.json();
        console.log(resp)
        if(resp.success == "false"){
            // show an alert that you haven't logged in or something else happened
            alert(resp.msg)
            return 
        }
        var new_cart = []
        let obj = {}
        for await (obj of resp.cart) {
            const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/getproduct",{

                method :"POST",
                headers : {
                    'Content-Type': 'application/json',
                    'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                },
                body : JSON.stringify({"productid" : obj.productid})
    
            })
    
            const resp = await response.json();
            // console.log(resp)
            if(resp.success == "true"){
                obj.product = resp.product
                new_cart.push(obj)
            }
        }

        
        setcart(new_cart)
        console.log(new_cart)
    }
    useEffect(()=>{
        fetchCart()
        console.log(cart)
    }, [cart])

  return (
    <div>
        <div class="col-lg-7  my-2" style={{display:"absolute", right:"10px"}}>
                <h5 class="mb-3"><a href="/" class="text-body">
                    <i class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</a></h5>
                </div>
        <section class="h-100" style={{backgroundColor:"#eee;"}}>
        
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
          <div>
            <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                  class="fas fa-angle-down mt-1"></i></a></p>
          </div>
        </div>
        {cart.map( (element, idx) => {
            
            return <div class="card rounded-3 mb-4" key={idx}>
            <div class="card-body p-4">
              <div class="row d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                    {element.product.pictures.length > 0 ?
                        <img
                        src={process.env.REACT_APP_CLOUDINARY_URL + element.product.pictures[0].img +".png"}
                        class="img-fluid rounded-3" />
                        :
                        <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3" />
                    }
                  
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">{element.product.name}</p>
                  <p><span class="text-muted">Overview: </span> {element.product.description} </p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button class="btn btn-link px-2" name ={element.productid}
                    onClick={event => {removeone(event, element.productid)}}>
                    <i class="fas fa-minus"></i>
                  </button>
  
                  <input id="form1" min="0" name="quantity" value={element.quantity} type="number"
                    class="form-control form-control-sm" disabled/>
  
                  <button class="btn btn-link px-2" name ={element.productid} onClick={event => {addtocart(event, element.productid)}}>
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">INR  {element.product.price}  / piece</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
        })}


 

        <div class="card mb-4">
          <div class="card-body p-4 d-flex flex-row">
            <div class="form-outline flex-fill">
              <input type="text" id="form1" class="form-control form-control-lg" />
              <label class="form-label" for="form1">Discound code</label>
            </div>
            <button type="button" class="btn btn-outline-warning btn-lg ms-3">Apply</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <a href="/chosepayment">
            <button type="button" class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Cart