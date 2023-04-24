import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


const ProductAdd = () => {
    let navigate = useNavigate();

    const onChange =(e)=>{
        setsignup({...signup,[e.target.name]:e.target.value})
    }

    const [signup, setsignup] = useState({
        name :"",
        description : "",
        org_price:"",
        price:"",
        quantity: "",
        discount : "",
        category : "",
    })

    const submitsignup = async (pictures)=>{
        console.log(signup)
        let formData = new FormData();
        formData.append('name', signup.name);
        formData.append('description', signup.description)
        formData.append('org_price', signup.org_price);
        formData.append('price', signup.price);
        formData.append('quantity', signup.quantity);
        formData.append('discount', signup.discount);
        formData.append('category', signup.category);
        formData.append('city', signup.city);
        formData.append('state', signup.state);
        formData.append('country', signup.country);
        formData.append('pincode', signup.pincode);
        if(pictures.length != 0){
            for (let picture of pictures){
            console.log(picture)
            formData.append('pictures', picture)
            }
        }

        console.log(formData)
        const response = await fetch(process.env.REACT_APP_BACKENDURL + "/api/createproduct",{

            method :"POST",
            headers : {
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                'signtoken' : process.env.REACT_APP_SIGNTOKEN,
                'auth-token': localStorage.getItem("authtoken")

            },
            body : formData

        })


        const resp = await response.json()
        if(resp.success == "false"){
            alert(resp.msg)
        }
        else{
            alert(resp.msg)
            navigate("../", { replace: true });

        }
        console.log(resp)

        // console.log(formData)
    }

    const handleClick = (e)=>{
        e.preventDefault();
        const pictures = e.target.pictures.files;
        submitsignup(pictures);
        
    }

    return (
        <div className="container my-4" style={{}}>
              <h2>Product Add</h2>
            <form onSubmit={handleClick}>
                <div class="form-row ">
                    <div class="form-group col-md-6 my-2">
                        <label for="inputEmail4">Product Name</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputEmail4" placeholder="IPhone 13" name="name" />
                    </div>
                    <div class="form-group col-md-6 my-2">
                        <label for="inputEmail4">Product Description</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputEmail4" placeholder="The best in the premium market" name="description" />
                    </div>
                </div>
                
                <div class="form-group col-md-4 my-2">
                    <label for="inputAddress">MRP</label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress" placeholder="10000" name="org_price" />
                </div>
                <div class="form-group col-md-4 my-2">
                    <label for="inputAddress2">price</label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress2" placeholder="10000" name="price" />
                </div>
                <div class="form-group col-md-4 my-2">
                    <label for="inputAddress">Quantity </label>
                    <input onChange={onChange} type="text" class="form-control" id="inputAddress" placeholder="123" name="quantity" />
                </div>
               
                <div class="form-row">
                
                    <div class="form-group col-md-4 my-2">
                        <label for="inputState">Discount</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputState" name="discount" />
                    </div>
                    <div class="form-group col-md-4 my-2">
                        <label for="inputCountry">Category</label>
                        <input onChange={onChange} type="text" class="form-control" id="inputCountry" name="category" />
                    </div>
                </div>

                <div class="form-group" >
                                    <label for="pictures" className="my-2">Product Picture</label>
                                    {/* <input type="file" class="form-control" id="blogpictures" name="blogpictures" aria-describedby="pictureHelp" /> */}
                                    <input className="form-control" type='file' multiple='multiple' accept='image/*' name='pictures' id='file' />

                                </div>
                


                <button type="submit" class="my-5 btn btn-primary">Sign in</button>
            </form>
        </div>
    )
}

export default ProductAdd