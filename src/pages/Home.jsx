import Loader from '../components/loader/Loader'
import './home.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Col, Row, Container} from 'react-bootstrap'
import LoaderText from '../components/loader/LoaderText'

const Home = () => {
    
    const [loading,setLoading] = useState(true);
    const [loadingUser,setLoadingUser] = useState(true);
    const [error,setError] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userDetail, setUserDetail] = useState(null);

    useEffect(()=>{
        
        const url = "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        axios.get(url)
            .then(({data})=>{
                // console.log(data)
                setUserData(data)
                // setUserDetail(data[0])
                setLoading(false)
            })
            .catch(e=>{
                console.log(e);
                setError(true)
            });
        
    },[])

    return (
        (!error && <div className="home">
            {
                (loading && <Loader/>) || <Container fluid className="p-3 homeContainer">
                    <Row className="mt-2">
                        <Col className="users">
                            <div className="title">Users List</div>
                            <Container fluid className="userContainer">
                                {
                                    userData.length !== 0 ? userData.map((user,idx)=>(
                                        <div className="user" onClick={()=>setUserDetail(user)} key={idx}>
                                            <img src={user.avatar} width="30px" onError={e=>e.currentTarget.src="/avatar.png"} alt="avatar"/>
                                            <span className="name">{user.profile.firstName}&nbsp;{user.profile.lastName}</span>
                                        </div>
                                    )) : <div className="user" style={{fontSize:"16px",fontWeight:"700",letterSpacing:"0.9px",justifyContent:"center"}}> No Records Found </div>
                                }
                            </Container>
                        </Col>
                        <Col className="userDetails px-5">
                            <div className="title">User Details</div>
                            {   (!userDetail && <LoaderText/>) || 
                                <Container className="userDetailsContainer">
                                    <img src={loadingUser ? '/loader.svg' : userDetail.avatar} alt="userImg" width="50px" onError={e=>{e.currentTarget.src="/avatar.png";}} onLoad={() => {setLoadingUser(false)}}/>
                                    <h4>@{userDetail.profile.username}</h4>
                                    <p>{userDetail.Bio} </p>
                                    <div>
                                        <label htmlFor="firstName">Full Name</label>
                                        <input type="text" value={userDetail.profile.firstName+" "+userDetail.profile.lastName} readOnly/>
                                    </div>
                                    <div>
                                        <label htmlFor="firstName">Job Title</label>
                                        <input type="text" value={userDetail.jobTitle} readOnly/>
                                    </div>
                                    <div>
                                        <label htmlFor="firstName">Email </label>
                                        <input type="text" value={userDetail.profile.email} readOnly/>
                                    </div>
                                </Container>
                            }
                        </Col>
                    </Row>
                </Container>
            }
        </div> ) || <div className="error">No Data To Show.<span> Error Occured!! Please Refresh the Page</span></div>
    )
}

export default Home;