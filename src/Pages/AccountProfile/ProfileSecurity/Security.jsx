import './Security.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from'react';
import { MdMonitor , MdSmartphone  } from 'react-icons/md';
import {UAParser} from "ua-parser-js" ;
const Security = () => {
    const [active_Authent_Methode, setActive_Authent_Methode] = useState(false);
    const [deviceData , setDeviceData] = useState([]);
    const [N, setActive_Authent_Methode_Number] = useState([]);
    const [passwordData , setPasswordData] = useState({
        currentPassword : '',
        newPassword : '',
        confirmNewPassword :''
    });

    const handleChange = (e)=>{
        const [name , value] = e.target ;
        setPasswordData({...passwordData ,[name] : value })
    }
   
    const active_Authentication_Methode = (n)=>{
        setActive_Authent_Methode(!active_Authent_Methode);
        if(N.includes(n)){
            setActive_Authent_Methode_Number( N.filter(item => item !== n));
        }else{
        setActive_Authent_Methode_Number(N => [...N, n]);
        }
    }

    const handleSubmit =(e)=>{
        e.preventDefault() ;
        const {currentPassword , newPassword , confirmNewPassword} = passwordData ;

        if(!currentPassword , !newPassword , !confirmNewPassword){
            alert("Please enter the new password ");
            return;
        }

        if(newPassword !== confirmNewPassword){
            alert("Passwords do not match , please try again.");
        }

        
    }
    useEffect(()=>{
        // have to modifie 
        const response = fetch('http://localhost/ModernShopWebsite/GetDevicesData.php');
        response.then(data => data.json()).then(data => {console.log(data); setDeviceData(data)});
        
    },[])
    return(
        <>
            <h2 className='mb-5 ms-3 mt-2'>Security</h2>

            <div className="securityContainer ">
                

                <form action="" onSubmit={handleSubmit}>
                    <h3 className='mb-6 font-semibold'>Change Password</h3>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handleChange}/>

                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handleChange} />

                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={passwordData.confirmNewPassword} onChange={handleChange} />

                    <button type="submit" className='bg-[#3b33dc] text-white w-50 px-2 py-1 rounded'>Update Password</button>
                </form>

                <p className="line  "></p>

                <div className="AuthenticationSection">
                    <h3 className=''>Two-Factor Authentication</h3>

                    <div className="SMS ms-3 ">
                        <div className="Authentication-Methode-Header">
                            <h4>SMS Authentication</h4>
                            <p>Receive verification codes via SMS</p>
                        </div>

                        <div className={`Methode-checking ${active_Authent_Methode && N.includes(1)? 'active' : ''}`} onClick={()=>{active_Authentication_Methode(1)}}>
                            <div className="Methode-checking-inner "></div>
                        </div>
                    </div>

                    <div className="Email-Methode ms-3">
                        <div className="Authentication-Methode-Header">
                            <h4>Email Authentication</h4>
                            <p>Receive verification codes via email</p>
                        </div>
                        <div className={`Methode-checking ${active_Authent_Methode && N.includes(2)? 'active' : ''}`} onClick={()=>{active_Authentication_Methode(2)}}>
                            <div className="Methode-checking-inner "></div>
                        </div>
                    </div>
                </div>


                <p className="line  "></p>


                <div className="activeSessions ">
                    <h3 className='mb-4'>Active Sessions</h3>
                    {
                        
                        deviceData.slice(0, 3).map((device) => {
                            const parser = new UAParser();
                            const result = parser.getResult();
                            return (        
                            <div className="sessions d-flex justify-content-between align-items-center ">
                                <div className="session-header d-flex  align-items-center g-1 ms-3">
                                    <img src={device.deviceType === 'desktop' || device.deviceType === 'screen'?  MdMonitor : MdSmartphone } alt="" />

                                    <div className="session-details">
                                        <h4>{device.browserName + "on" + device.osName}</h4>
                                        <p>{device.platform}</p>
                                    </div>
                                </div>

                                <div className="session-status me-5">
                                    <p>{device.deviceType === result.device.model ? 'Active' : 'Inactive' }</p>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Security;