
import { useEffect, useState } from 'react';
import './register.css'
import Forminputs from '../../forminputs';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from 'axios'
import logo from '../register/security.png'

function Regiter() {



  const [terms, setterms] = useState(false);
  const [sign, setsign] = useState(false)


  const [values, setvalues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    otp: '',
    service: 'not selected',
    term: terms
  })

  useEffect(() => {

    if (values.firstname.length === 0 || values.lastname.length === 0 ||
      values.password.length < 8 || values.password !== values.confirm_password ||
      values.phone.length !== 10 || values.otp.length !== 6 ||
      values.email.includes("@") !== true) {
      setsign(true)
    }
    else {
      setsign(true)
    }
  }, [values])

  const inputs = [
    {
      name: "firstname",
      lable: 'First Name',
      type: 'text',
      error_msg: "First name is required"
    },
    {
      name: 'lastname',
      lable: 'Last Name',
      type: 'text',
      error_msg: "Last name is required"
    },
    {
      name: 'email',
      lable: 'Email',
      type: 'email',
      error_msg: 'Enter valid email'
    },
    {
      name: 'password',
      lable: 'Password',
      type: 'password',
      error_msg: 'Password contain min 8 letter',
      min_len: '8'
    },
    {
      name: 'confirm_password',
      lable: 'Confirm Password',
      type: 'password',
      pattern: values.password,
      error_msg: 'Password not matched',
      min_len: '8'
    },
    {
      name: 'phone',
      lable: 'Phone',
      type: 'text',
      error_msg: 'phone number should be 10 numbers',
      pattern: '[0-9]{10}',
      min_len: 10,
      max_len: 10
    },
    {
      name: 'otp',
      lable: 'OTP',
      type: 'text',
      pattern: '[0-9]{6}',
      error_msg: 'OTP is required',
      min_len: 6,
      max_len: 6
    }

  ]


  const onchange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value })
  }

  const Recaptcha = () => {
    console.log(values.phone)
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });

  }

  const otpgenrate = () => {
    if (values.phone.length !== 10) return
    Recaptcha();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, '+91' + values.phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;


      }).catch((error) => {
        console.log(error)
      });


  }

  const handlesubmit = (e) => {
    e.preventDefault();
    const code = values.otp
    const confirmationResult = window.confirmationResult;
    confirmationResult.confirm(code)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;

        submit()

      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error.message)

      });
  }

  const submit = async () => {
    await axios.post("http://localhost:5000/register", values)
      .then(res => {
        console.log(res.data)
        setvalues({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirm_password: '',
          phone: '',
          otp: '',
          service: 'not selected',
          term: terms
        })
      })
      .catch(error => console.log(error.message))

  }
  // console.log(values)
  return (

    <div className=' container mt-4 border rounded-1 shadow '>
      <div className='row '>
        <div className=' col-md-4 my-primary d-flex align-items-center justify-content-center'>
          <div className=' text-center text-light'>
            <img className='img-fluid img-container' src={logo} alt='gurd'></img>
            <div className='word_space mt-2'>
              Register your details <br />
              and we will notify soon
            </div>
          </div>

        </div>

        <div className='col-md-8 px-md-5' >
          <h3 className='text-center my-5 my-primary-1'>Service Provider  Register</h3>

          <form onSubmit={handlesubmit}>

            <div className='container'>
              {/* firstname  row*/}
              <div className='row'>
                <div className=' col-sm-6' >

                  <Forminputs input={inputs[0]} values={values.firstname} onChange={onchange} />
                </div>

                <div className=' col-sm-6 '>
                  <Forminputs input={inputs[1]} values={values.lastname} onChange={onchange} />
                </div>
              </div>
              {/* email row */}
              <div className='row'>
                <div >
                  <Forminputs input={inputs[2]} values={values.email} onChange={onchange} />
                </div>
              </div>

              {/* password row */}

              <div className='row '>
                <div className='col-sm-6 '>
                  <Forminputs input={inputs[3]} values={values.password} onChange={onchange} />
                </div>

                <div className='col-sm-6 '>
                  <Forminputs input={inputs[4]} values={values.confirm_password} onChange={onchange} />
                </div>
              </div>

              {/* phone and otp row */}

              <div className='row'>

                <div className=' col-sm-6 '>
                  <Forminputs input={inputs[5]} values={values.phone} onChange={onchange} />
                </div>
                <div className=' col-sm-6'>
                  <Forminputs onClick={otpgenrate} values={values.otp} input={inputs[6]} onChange={onchange} />
                </div>

              </div>

              {/* Service section */}

              <div className='my-3' >
                <p className='d-block mb-2'>Service Provider Type</p>
                <div className=' d-md-flex align-items-center'>
                  <div>
                    <input name="service" type='radio' value="B2B/ Household" onChange={onchange}></input>
                    <span className='mx-1'>B2B/ Household</span>
                  </div>
                  <div>
                    <input name="service" type='radio' value="Listing Service" onChange={onchange} ></input>
                    <span className='mx-1'>Listing Service</span>
                  </div>
                  <div>
                    <input name="service" type='radio' value="Education" onChange={onchange}></input>
                    <span className='mx-1'>Education</span>
                  </div>
                  <div>
                    <input name="service" type='radio' value="Store Service" onChange={onchange}></input>
                    <span className='mx-1'>Store Service</span>
                  </div>

                </div>
              </div>
              {/* term and Conditions */}
              <div className='mt-3 d-flex '>
                <div className=''>
                  <input
                    name="term"
                    type='checkbox'
                    className='me-1'
                    value={!terms}
                    onClick={e => setterms(e.target.value)}
                    onChange={onchange}></input>
                </div>
                <p >By creating an account you agree to our  <span className='terms'>Terms and Conditions</span> & <span className='terms'>Privacy Policy</span></p>

              </div>
              {/* button section */}
              <div className={sign ? "btn_show " : "btn_unshow"}>
                <input className='btn btn-outline-dark mx-1 px-4' type='button' value="CANCEL"></input>
                <input className='button btn btn-outline-dark  mx-1 px-4' type='submit' value="REGISTER"></input>
              </div>

            </div>
            <div id='sign-in-button' ></div>
          </form>

        </div >
      </div>

      <div className='row '>
        <div className='col-md-4'></div>
        <div className='col-md-8 px-5'>
          <div className='container'>
            <p >* Mentioned fields are mandatory</p>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Regiter;
