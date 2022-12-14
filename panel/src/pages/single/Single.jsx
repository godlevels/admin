import { useState, useEffect } from "react"
import "./single.scss"
import logo from "../../components/images/Ellipse.png"
import Navbar from "../../components/navbar/Navbar"
import UserButton from "../../components/userbutton/UserButton"
import { Link } from "react-router-dom"
import axios from "axios"
import DeleteModal from "../../components/DeleteModal"
import baseurl from '../../constants/baseurl';

const Single = () => { 
  const [deleteModal, setDeleteModal] = useState(false)
  const [data, setData] = useState ([])
  const [status, setStatus] = useState (false)
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get('id')

 
useEffect (() => {
  const fetchUsers = async () => {
    try{ 

      const requestOptions = {
        method: "GET",
        url: `${baseurl()}/user/${userId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.token
        }
      }

  const res = await axios (requestOptions)

  console.log(res);

    setData(res.data.data) 
      setStatus(true);
    }catch(err){
    console.log(err);
  }
}
    fetchUsers()
},[])

  return (
     <div className="single"> 
     <div className="singleBar"> 
        <div className="top">
          <Link to="/dashboard"><img className="logo" src={ logo } alt="Logo" /></Link>
        </div>
 
        <div className="center"> 
                <ul>
                    <Link to={`/users/personalinfo?id=`+userId}><li><span>Personal Information</span></li></Link>
                    <Link to={`/users/activity?id=`+userId}><li><span>Account Activity</span></li></Link>
                    <Link to={`/users/analytics?id=`+userId}><li><span>Analytics</span></li></Link>
                </ul>

                <UserButton onClick={() => {setDeleteModal(true)}} />
                
        </div> 
     </div>
      <div className="singleContainer">
        <Navbar />
        <div className="basicInfo">
          <h1>Personal Information</h1>
          <p>Contains all basic user info used on Grow app</p>
          <h3>Basic Info</h3>
        </div>

        <div className="infoDetail">
          <div className="right">
            <h1>Full Name</h1>
            <h1>Email Address</h1> 
            <h1>Phone Number</h1>
            <h1>Location</h1>
            <h1>Account status</h1>
            <h1>Date created</h1>
            <h1>Number of farms</h1>
          </div>
          {
            status ? <div className="left" key={data._id}>

              <p>{ data.user.fullName }</p>
              <p>{ data.user.email }</p>
              <p>{ data.user.phoneNumber }</p>
              <p>{data.user.cityState }</p>
              <p className="status">{ data.user.status }</p>
              <p>{new Date(data.user.created_at).toLocaleString() }</p>
              <p>{data.farms.length}</p>
            </div> : 'Loading...'
          }
           
          
        </div>
          
        <br />
        <hr />
        <br />
        <div className="basicInfo">
          <h4>Farm Details</h4>

          <table cellPadding={10}>
            <thead>
              <tr>
                <th>#</th>
                <th>Farm Name</th>
                <th>Farm Location</th>
                <th>Crop</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {
                status ? 
                data.farms.map((info, key) => {
                  return <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{info.farmName}</td>
                    <td>{info.address}</td>
                    <td>{info.cropName}</td>
                    <td>{info.longitude}</td>
                    <td>{info.latitude}</td>
                    <td>{new Date(info.created_at).toLocaleString()}</td>
                  </tr> 
                })
                : 
                <tr><td colspan="6">Loading...</td></tr>
              }
            </tbody>
          </table>
        </div>

        {deleteModal && <DeleteModal closeModal={setDeleteModal} />}
      </div>
    </div> 
  )
} 

export default Single