import React, {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    });
    const [formerrors, setformerrors] = useState({});
    const [isSubmit, setIssubmit] = useState(false);
    const [showpassword, setShowpasswordecked] = useState("password");
    const [checked, setChecked] = useState();
    const [loginapidata, setLoginapidata] = useState([]);

    const toastSucess = () => toast.success("success", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });

    const toastwarning = () => toast.error("plz login first", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000
    });

    useEffect(() => {
        if (localStorage.getItem('login_token')) {
            navigate('/')
        }else{
            navigate('/signup')
        }
    })

 
    const validate = (values) => {
        let errors = {};
        const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regex_password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (values.email == '') {
            errors.email = "email is required";
        } else if (!regex_email.test(values.email)) {
            errors.email = "invalid email";
        }
        if (values.password == "") {
            errors.password = "password is required";
        } else if (!regex_password.test(values.password)) {
            errors.password = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number";
        }
        return errors;
    }

    const handlevalues = (e) => {
        setFormdata((list) => {
            const formlistdata = { ...list, [e.target.name]: e.target.value }
            setformerrors(validate(formdata));
            return formlistdata
        })
    }
    const checkValidation = (e) => {
        e.preventDefault()
        setIssubmit(false)
        setformerrors(validate(formdata));
        setIssubmit(true)
    }
    const  HandleSubmit = (e) => {
        e.preventDefault();
        const toast_loading = toast.loading("Please wait....", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
        })
        if (Object.keys(formerrors).length == 0 && isSubmit) {
            axios.post(`https://reqres.in/api/login`,formdata).then((res)=>{
                localStorage.setItem("login_token", res?.data?.token)
                setLoginapidata(res?.data?.data)
                toast.update(toast_loading, { render: "Login Successfully", type: "success", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
                setTimeout(() => {
                    navigate('/')
                }, 1000);
           })
           .catch((errr)=>{
            toast.update(toast_loading, { render: `${errr.message}`, type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
           })
        } else {
            toast.update(toast_loading, { render: "Login failed", type: "error", isLoading: false, position: toast.POSITION.TOP_CENTER, autoClose: 1000 });
        }
    }
    return (
        <>

        <ToastContainer />
        <form className="mt-5" onSubmit={HandleSubmit} style={{ maxWidth: "50%", margin: "auto" }}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formdata.email} onChange={handlevalues} onClick={checkValidation} />
                <div id="emailHelp" class="form-text" style={{ color: "red" }}>{formerrors.email}</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label" >Password</label>
                <input type={showpassword} class="form-control" id="exampleInputPassword1" name="password" value={formdata.password} onChange={handlevalues} onClick={checkValidation} />
                <div id="emailHelp" class="form-text" style={{ color: "red" }} >{formerrors.password}</div>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={()=>setShowpasswordecked(showpassword === "password"?"text":"password")}/>
                <label class="form-check-label" for="exampleCheck1" >Show Password</label>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={()=>setChecked(!checked)}/>
                <label class="form-check-label" for="exampleCheck1" >Check me out</label>
            </div>
            <button type="submit" className={`btn btn-primary ${checked ? "enabled ":"disabled not-allowed"}`} >Submit</button>
        </form>
        </>
    )
}
