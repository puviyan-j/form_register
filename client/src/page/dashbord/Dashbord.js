import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Dashbord() {

  const [userDetails, setuserDetails] = useState([]);
  const [users, setusers] = useState([])
  const [searchterm, setsearchterms] = useState('');
  const [sort, setsort] = useState(null);
  const [sortlist, setsortlist] = useState(false)
  const { token } = useParams()

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/getdata", { headers: { Authorization: token } })
      .then(res => {
        setuserDetails(res.data)
        setusers(res.data)
      })
      .catch(error => console.log(error.message))
    }
    catch (error) { console.log(error) }

  }, [token])

  useEffect(() => {

    const filterd = userDetails.filter((data) =>
      data.email.toLowerCase().includes(searchterm.toLowerCase()))
    setusers(filterd)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchterm])

  useEffect(() => {

    if (sort) {
      const sorted = users.sort((a, b) => {
        let fa = a.email;
        let fb = b.email;
        if (fa < fb) { return -1 }
        if (fa > fb) { return 1 }
        return 0
      });
      setusers(sorted)
    } else {
      const sorted = users.sort((a, b) => {
        let fa = a.email;
        let fb = b.email;
        if (fa > fb) { return -1 }
        if (fa < fb) { return 1 }
        return 0
      })
      setusers(sorted)
    }
    setsortlist(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])



  console.log(userDetails[0]);



  return (
    <div>
      <div className='d-flex justify-content-between p-2 px-5 w-100 bg-danger'>
        <input onChange={e => setsearchterms(e.target.value)} value={searchterm} type='text'></input>
        <div className="position-relative me-17">
          <span onClick={() => (setsortlist(!sortlist))} className='pointer px-2 text-light'>sort</span>
          {sortlist && <div className="position-absolute ">

            <span className='pointer d-block px-2 bg-primary text-light text-center' onClick={() => (setsort(true))}>A-Z</span>
            <span className='pointer d-block px-2 bg-primary text-light text-center' onClick={() => (setsort(false))} >Z-A</span>


          </div>}
        </div>


      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Service</th>
          </tr>
        </thead>

        <tbody>
          {users.map((users, index) => (

            <tr key={users._id}>
              <th scope="row">{index + 1}</th>
              <td>{users.firstname}</td>
              <td>{users.lastname}</td>
              <td>{users.email}</td>
              <td>{users.phone}</td>
              <td>{users.service}</td>
            </tr>
          ))}
        </tbody>

      </table>


    </div>
  )
}

export default Dashbord