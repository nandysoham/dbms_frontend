import React,{useState, useEffect} from 'react'

const ChosePayment = () => {
    const [order, setorder] = useState([])
    const [total, settotal] = useState(0)
    const getorder = async ()=>{

        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/createorder",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },

        })

        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg);
        }
        else{
            console.log(resp)
            settotal(resp.payment)
            var new_order = []
        let obj = {}
        for await (obj of resp.final_part) {
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
                new_order.push(obj)
            }
        }
        setorder(new_order)

        }

    }

    useEffect(()=>{
        console.log("I am from useEffect")
        getorder()
    }, [])
  return (
    <div className="container">
        <section class="vh-100" style={{backgroundColor: "#fdccbc;"}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col">
        <p><span class="h2">Shopping Cart </span><span class="h4">(1 item in your cart)</span></p>
        {order.map((element , idx) => {
            return <div class="card mb-4">
            <div class="card-body p-4">
  
              <div class="row align-items-center">
                <div class="col-md-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                    class="img-fluid" alt="Generic placeholder image"/>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-4 pb-2">Name</p>
                    <p class="lead fw-normal mb-0">{element.product.name}</p>
                  </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-4 pb-2">Color</p>
                    <p class="lead fw-normal mb-0"><i class="fas fa-circle me-2" style={{color: "fdd8d2"}}></i>
                      </p>
                  </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-4 pb-2">Quantity</p>
                    <p class="lead fw-normal mb-0">{element.quantity}</p>
                  </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-4 pb-2">Price</p>
                    <p class="lead fw-normal mb-0">{element.product.price}</p>
                  </div>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <div>
                    <p class="small text-muted mb-4 pb-2">Total</p>
                    <p class="lead fw-normal mb-0">{element.payment}</p>
                  </div>
                </div>
              </div>
  
            </div>
          </div>
        })}
        

        <div class="card mb-5">
          <div class="card-body p-4">

            <div class="float-end">
              <p class="mb-0 me-5 d-flex align-items-center">
                <span class="small text-muted me-2">Order total:</span> <span
                  class="lead fw-normal">{}</span>
              </p>
            </div>

          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-light btn-lg me-2">Continue shopping</button>
          <button type="button" class="btn btn-primary btn-lg">Add to cart</button>
        </div>

      </div>
    </div>
  </div>
</section>


    </div>
  )
}

export default ChosePayment