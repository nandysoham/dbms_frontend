import React,{useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


const MakePayment = () => {
    let navigate = useNavigate();
    const [payment, setpayment] = useState({options:"", cardno:"", cvv:""})

    const onChange =(e)=>{
        setpayment({...payment,[e.target.name]:e.target.value})
    }
    const debitoption = async(orderid, cardno, cvv)=>{
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/makepayment/debit",{

            method :"POST",
            headers : {
                'Content-Type': 'application/json',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token' : localStorage.getItem("authtoken")
            },
            body : JSON.stringify({orderid : orderid, DEBIT_CARD : cardno, DEBIT_CVV : cvv})

        })

        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg)
        }
        else{
            alert(resp.msg)
            navigate("../", { replace: true });
        }



    }

    const creditoption = async(orderid, cardno, cvv)=>{
        
    }
    const handleClick = (e)=>{
        e.preventDefault();
        console.log(payment)
        if(payment.options == ""){
            alert("Please check a valid card option")
            return
        }
        const orderid = localStorage.getItem("pay_orderid")
        if(payment.options == "credit"){
            creditoption(orderid, payment.cardno, payment.cvv)
        }
        else{
            debitoption(orderid, payment.cardno, payment.cvv)
        }
     
    }

    return (
        <div className="container my-15">
            <h2>Please proceed with Payment</h2>
            <div class="btn-group my-5">
                <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" onChange={onChange} value="credit"  />
                <label class="btn btn-secondary" for="option1">Credit Card</label>

                <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" onChange={onChange} value="debit"/>
                <label class="btn btn-secondary" for="option2">Debit Card</label>

            </div>
            <div class="container my-5 py-5">
                <div class="row d-flex justify-content-center py-5">
                    <div class="col-md-7 col-lg-5 col-xl-4">
                        <div class="card" style={{ borderRadius: "15px;" }}>
                            <div class="card-body p-4">
                                <form onSubmit={handleClick}>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput"> Card Number</label>
                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="XXXX XXXX XXXX" name="cardno" onChange={onChange} />
                                    </div>
                                    <div class="form-group my-3">
                                        <label for="formGroupExampleInput2"> CVV </label>
                                        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="XXX" name="cvv" onChange={onChange} />
                                    </div>

                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MakePayment