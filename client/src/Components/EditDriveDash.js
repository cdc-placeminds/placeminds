import React, { useEffect } from 'react'
import { useDriveData } from './context/DriveDataContext'
import DriveCard from './DriveCard';
import { useAdmin } from './context/AdminContext';
import { useNavigate } from 'react-router-dom';

const EditDriveDash = () => {

    const navigate = useNavigate();
    const {isAdmin} = useAdmin();

    const checkisAdmin = () => {
        if(!isAdmin ){
            navigate('/')
        } 
    } 

    useEffect(() => {
        checkisAdmin();
        // eslint-disable-next-line
    }, [])
    

    const { driveData } = useDriveData();
    const drivesArray = Object.keys(driveData).map(key => driveData[key])

    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 col-12 mx-auto">
                    <div className="container-fluid dashboard">
                        <div className="row">


                            <div className="col-md-8 dash">
                                <div className="drivesecheading">
                                    <span className="material-symbols-outlined">
                                        business_center
                                    </span>
                                    <h1> EDIT DRIVES</h1>
                                </div>


                                {/* DriveCard  */}

                                {drivesArray.reverse().map((drive, index) => (
                                    <DriveCard key={index} drive={drive} />
                                ))}


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditDriveDash