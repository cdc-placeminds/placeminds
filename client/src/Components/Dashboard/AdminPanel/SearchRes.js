import React, { useState, useEffect } from 'react'
import { useAlert } from '../../context/AlertContext'
import HashLoader from 'react-spinners/HashLoader';

const SearchRes = ({ data, searchFor }) => {
    const [isOpen, setisOpen] = useState(false);
    const [isReadOnly, setisReadOnly] = useState(true);
    const [loading, setLoading] = useState(false);
    const { showalert } = useAlert()
    // Student state
    const [updatedStudentData, setStudentData] = useState({
        name: data.name,
        email: data.email,
        enrollment: data.enrollment,
        contact: data.contact,
        branch: data.branch,
        year: data.year,
        gender: data.gender,
        dob: data.dob,
        id: data.id
    });

    // Drive state
    const [updatedDriveData, setDriveData] = useState({
        name: data.name,
        profile: data.profile,
        ctc: data.ctc,
        location: data.location,
        year: data.year,
        deadline: data.deadline,
        branch: data.branch,
        id: data.id
    });

    useEffect(() => {
        if (searchFor === 'Student') {
            setStudentData({
                name: data.name,
                email: data.email,
                enrollment: data.enrollment,
                contact: data.contact,
                branch: data.branch,
                year: data.year,
                gender: data.gender,
                dob: data.dob,
                id: data.id
            });
        } else if (searchFor === 'Drive') {
            setDriveData({
                name: data.name,
                profile: data.profile,
                ctc: data.ctc,
                location: data.location,
                year: data.year,
                deadline: data.deadline,
                branch: data.branch,
                id: data.id
            });
        }
    }, [data, searchFor]);


    const handleInputs = ({ currentTarget: input }) => {
        if (searchFor === 'Student') {
            setStudentData({
                ...updatedStudentData,
                [input.name]: input.value
            });
        } else if (searchFor === 'Drive') {
            setDriveData({
                ...updatedDriveData,
                [input.name]: input.value
            });
        }
    };


    const handleAdmin = () => {
        setLoading(true)
        const makeadmin = data.isAdmin ? false : true
        fetch(`${process.env.REACT_APP_BASE_URL}/api/users/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ makeadmin, email: data.email })
        }).then(response => response.json())
            .then(data => {
                setLoading(false)
                showalert('Success', '', 'success')
                console.log("Successful");

            })
            .catch(error => {
                showalert('Error', '', 'danger')
                console.log(error);
            });

    }


    const handleEdit = (e) => {
        e.preventDefault();
        setisReadOnly(false)
    }

    const handleSubmit = async (e) => {
        // setisReadOnly(true)

        e.preventDefault()
        console.log("Inside Submit")

        if (searchFor === 'Student') {
            //Backend URL
            const url = `${process.env.REACT_APP_BASE_URL}/api/users/update`;
            //Fetch Api Methods Defining
            const fetchMethods = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    updatedStudentData
                })
            }
            //Calling Fetch API
            const res = await fetch(url, fetchMethods);

            //If registration is successfull
            if (res.status === 201) {
                setisOpen(false)
                showalert("Success:", "User Update Successful", "success")
                console.log("User Update Successful")
            }

            // //Checking If any error occured 
            else if (res.status === 422) {
                setisOpen(false)
                showalert("Error:", "User Not Found", "warning")
                console.log("User Update Unsuccessful")
            }

            else {
                setisOpen(false)
                showalert("Error:", "Server Error", "warning")
                console.log("User Update Unsuccessful")
            }
        }
        //Fetch Request for Drive Updation

        if (searchFor === 'Drive') {
            //Backend URL
            const url = `${process.env.REACT_APP_BASE_URL}/api/drive/updatedrive`;
            //Fetch Api Methods Defining
            const fetchMethods = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    updatedDriveData
                })
            }
            //Calling Fetch API
            const res = await fetch(url, fetchMethods);

            //If registration is successfull
            if (res.status === 201) {
                setisOpen(false)
                showalert("Success:", "Drive Update Successful", "success")
                console.log("Drive Update Successful")
            }

            // //Checking If any error occured 
            else if (res.status === 422) {
                setisOpen(false)
                showalert("Error:", "Drive Not Found", "warning")
                console.log("Drive Update Unsuccessful")
            }

            else {
                setisOpen(false)
                showalert("Error:", "Server Error", "warning")
                console.log("Drive Update Unsuccessful")
            }
        }
    }


    const showUserDtl = () => {
        console.log(updatedStudentData)
        setisOpen(true)
    }

    // selection options for year and branches 
    const renderBranchOptions = () => {
        const branches = ['CSE', 'CST', 'IT', 'ITE', 'AIDS', 'AIML', 'ECE', 'EEE', 'MAE', 'ME']; // Add more branches if needed
        return branches.map((branch, index) => (
            <option key={index} value={branch}>
                {branch}
            </option>
        ));
    };

    const renderBranchOptionsforDrive = () => {
        const branches = ['CSE', 'CST', 'IT', 'ITE', 'AIDS', 'AIML', 'ECE', 'EEE', 'MAE', 'ME']; // Add more branches if needed
        return branches.map((branch, index) => (
            <>
                <input
                    type="checkbox"
                    id={`branchChoice-${branch}`}
                    name="branch"
                    value={branch}
                    disabled={isReadOnly ? true : false}
                    checked={updatedDriveData.branch.includes(branch)}
                    onChange={(e) => handleBranchCheckboxChange(e, branch)} />
                <label className='mr-[7%] ml-[1%]' htmlFor={`branchChoice-${branch}`}>{branch}</label>
            </>
        ));
    };

    const handleBranchCheckboxChange = (e, selectedBranch) => {
        if (updatedDriveData.branch.includes(selectedBranch)) {
            // If branch is already selected, remove it from the array
            setDriveData(prevData => ({
                ...prevData,
                branch: prevData.branch.filter(branch => branch !== selectedBranch)
            }));
        } else {
            // If branch is not selected, add it to the array
            setDriveData(prevData => ({
                ...prevData,
                branch: [...prevData.branch, selectedBranch]
            }));
        }
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const endYear = currentYear + 10; // Display options up to 10 years from current year
        const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);

        return years.map((year, index) => (
            <option key={index} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <div>
            {loading && <div className='text-center absolute z-[999] top-[50%] left-[50%]' ><HashLoader

                color={'#0b5ed7'}
                loading={loading}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            /></div>}
            <div className='displayres flex m-[3%] p-[3%] pl-[5%] bg-bkg shadow-md hover:shadow-xl hover:scale-[102%] justify-between'>
                <div onClick={showUserDtl} className='w-[74%]'>
                    <div className="reshead flex flex-col">
                        <h1 className='flex font-head text-[25px] font-[400]'>{data.name}</h1>
                        {searchFor === 'Student' ?
                            <h1 className='flex font-head text-[18px] font-[400] mt-[10px]'>{data.enrollment}</h1>
                            :
                            <h1 className='flex font-head text-[18px] font-[400] mt-[10px]'>{data.profile}</h1>
                        }
                    </div>
                    <div className="resbody flex flex-col">
                        {searchFor === "Student" ?
                            <h1 className='flex font-head text-[15px] font-[400] mt-[20px] font-[600]'>{data.branch}</h1>
                            :
                            <h1 className='flex font-head text-[15px] font-[400] mt-[20px] font-[600]'>{Array.isArray(data.branch) ? data.branch.join(" | ") : data.branch}</h1>
                        }
                        <h1 className='flex font-head text-[15px] font-[400] mt-[5px] '>{data.year}</h1>

                    </div>
                </div>
                <div className="resbtns">
                    {searchFor === 'Student'
                        ? (data.isAdmin
                            ? <button className='btn btn-primary btn-sm' type='button' onClick={handleAdmin}>Remove Admin</button>
                            : <button className='btn btn-primary btn-sm' type='button' onClick={handleAdmin}>Make Admin</button>)
                        : ""
                    }
                </div>
            </div>



            {/* --------------------Edit Popup Starts for Student-------------------- */}
            {searchFor === "Student" && isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Content of the popup */}
                        <div className='comphead'>
                            <h2>Edit Profile</h2>
                        </div>

                        <div className="horline"></div>
                        {/* <div className='h-[20px] text-center'>
                            <label htmlFor="usernexistence" className={`text-base px-[3%] py-[2%] font-head ${FixedWarning.type === 'success' ? 'bg-succ' : 'text-warn'}`}>{FixedWarning.msg}</label>
                        </div> */}

                        <form>

                            <div className='mt-[20px]  grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-2 gap-y-3'>

                                <div className="form-floating">
                                    <input type="text" name="name" className="form-control" id="floatingInput" placeholder="First Name" value={updatedStudentData.name} disabled={isReadOnly ? true : false} onChange={handleInputs} autoFocus required />
                                    <label className='w-full text-headcolor ' htmlFor="floatingInput">Full Name</label>
                                </div>

                                <div className="form-floating">
                                    <input type='email' id='floatingemail' name='email' className={`form-control`} placeholder='EMAIL ADDRESS' required value={updatedStudentData.email} disabled={isReadOnly ? true : false} onChange={handleInputs} ></input>
                                    <label className='w-full  text-headcolor' htmlFor="floatingemail">Email Address</label>
                                </div>


                                <div className="form-floating">
                                    <input id='floatingenrollment' name='enrollment' className="form-control" placeholder='' required value={updatedStudentData.enrollment} disabled={isReadOnly ? true : false} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <label className='w-full text-headcolor ' htmlFor="floatingenrollment">Enrollment No.</label>
                                </div>
                                <div className="form-floating">
                                    <input id='flaotingcontact' name='contact' className="form-control" placeholder='' required value={updatedStudentData.contact} disabled={isReadOnly ? true : false} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <label className='w-full text-headcolor ' htmlFor="flaotingcontact">Contact No.</label>
                                </div>
                                <div className="form-floating">
                                    <select
                                        className="form-select text-center"
                                        id="floatingYear"
                                        name="year"
                                        value={updatedStudentData.year}
                                        disabled={isReadOnly ? true : false}
                                        onChange={handleInputs}
                                        required
                                    >
                                        <option value="">Select Passing Out Year</option>
                                        {renderYearOptions()}
                                    </select>
                                    <label className='w-full text-headcolor ' htmlFor="floatingYear">Passing Out Year</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        id='floatingdob'
                                        name='dob'
                                        className="form-control  text-center"
                                        placeholder="(DD/MM/YYYY)"
                                        required
                                        value={updatedStudentData.dob}
                                        disabled={isReadOnly ? true : false}
                                        onChange={handleInputs}
                                        type='date'
                                    />
                                    <label className='doblbl w-full ' htmlFor="floatingdob">Dob (DD/MM/YYYY)</label>
                                </div>
                                {/* branch  */}
                                <div className="form-floating md:col-span-2">
                                    <select
                                        className="form-select text-center"
                                        id="floatingBranch"
                                        name="branch"
                                        value={updatedStudentData.branch}
                                        disabled={isReadOnly ? true : false}
                                        onChange={handleInputs}
                                        required
                                    >
                                        <option value="">Select Branch</option>
                                        {renderBranchOptions()}
                                    </select>
                                    <label className='w-full text-headcolor ' htmlFor="floatingBranch">Branch</label>
                                </div>
                                {/* gender */}
                                <fieldset className='md:col-span-2 '>
                                    <legend>Gender:</legend>
                                    <div className="gendiv ">
                                        <input
                                            className='mr-[1%]'
                                            type="radio"
                                            id="genderChoice1"
                                            name="gender"
                                            value="male"
                                            disabled={isReadOnly ? true : false}
                                            checked={updatedStudentData.gender === "male"}
                                            onChange={handleInputs}
                                            required

                                        />
                                        <label className='mr-[5%]' htmlFor="genderChoice1">Male</label>

                                        <input
                                            className='mr-[1%]'
                                            type="radio"
                                            id="genderChoice2"
                                            name="gender"
                                            value="female"
                                            disabled={isReadOnly ? true : false}
                                            checked={updatedStudentData.gender === "female"}
                                            onChange={handleInputs}
                                            required
                                        />
                                        <label className='mr-[5%]' htmlFor="genderChoice2">Female</label>

                                        <input
                                            className='mr-[1%]'
                                            type="radio"
                                            id="genderChoice3"
                                            name="gender"
                                            value="prefer not to say"
                                            disabled={isReadOnly ? true : false}
                                            checked={updatedStudentData.gender === "prefer not to say"}
                                            onChange={handleInputs}
                                            required
                                        />
                                        <label className='mr-[3%]' htmlFor="genderChoice3">Prefer Not to Say</label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="horline"></div>

                            <div className="compbtn">
                                <button className='btn btn-secondary mx-2 my-2' onClick={() => { setisOpen(false) }}>Close</button>
                                {isReadOnly
                                    ? <button type='submit' className='btn btn-primary mx-2 my-2' onClick={handleEdit}>Edit</button>
                                    : <button type='submit' className='btn btn-primary mx-2 my-2' onClick={handleSubmit}>Save</button>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            )}
            {/* --------------------Popup Ends-------------------- */}
            {/* --------------------Edit Popup Starts for Drives-------------------- */}
            {searchFor === "Drive" && isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        {/* Content of the popup */}
                        <div className='comphead'>
                            <h2>Edit Drive</h2>
                        </div>

                        <div className="horline"></div>
                        {/* <div className='h-[20px] text-center'>
                            <label htmlFor="usernexistence" className={`text-base px-[3%] py-[2%] font-head ${FixedWarning.type === 'success' ? 'bg-succ' : 'text-warn'}`}>{FixedWarning.msg}</label>
                        </div> */}

                        <form>

                            <div className='mt-[20px]  grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-2 gap-y-3'>

                                <div className="form-floating">
                                    <input type="text" name="name" className="form-control" id="floatingInput" placeholder="First Name" value={updatedDriveData.name} disabled={isReadOnly ? true : false} onChange={handleInputs} autoFocus required />
                                    <label className='w-full text-headcolor ' htmlFor="floatingInput">Full Name</label>
                                </div>

                                <div className="form-floating">
                                    <input type='text' id='floatingprofile' name='profile' className={`form-control`} placeholder='EMAIL ADDRESS' required value={updatedDriveData.profile} disabled={isReadOnly ? true : false} onChange={handleInputs} ></input>
                                    <label className='w-full  text-headcolor' htmlFor="floatingprofile">Profile</label>
                                </div>


                                <div className="form-floating">
                                    <input id='floatingctc' name='ctc' className="form-control" placeholder='' required value={updatedDriveData.ctc} disabled={isReadOnly ? true : false} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <label className='w-full text-headcolor ' htmlFor="floatingctc">CTC</label>
                                </div>
                                <div className="form-floating">
                                    <input id='flaotinglocation' name='location' className="form-control" placeholder='' required value={updatedDriveData.location} disabled={isReadOnly ? true : false} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                    <label className='w-full text-headcolor ' htmlFor="flaotinglocation">location</label>
                                </div>
                                <div className="form-floating">
                                    <select
                                        className="form-select text-center"
                                        id="floatingYear"
                                        name="year"
                                        value={updatedDriveData.year}
                                        disabled={isReadOnly ? true : false}
                                        onChange={handleInputs}
                                        required
                                    >
                                        <option value="">Select Passing Out Year</option>
                                        {renderYearOptions()}
                                    </select>
                                    <label className='w-full text-headcolor ' htmlFor="floatingYear">Passing Out Year</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        id='floatingdeadline'
                                        name='deadline'
                                        className="form-control  text-center"
                                        placeholder="(DD/MM/YYYY)"
                                        required
                                        value={updatedDriveData.deadline}
                                        disabled={isReadOnly ? true : false}
                                        onChange={handleInputs}
                                        type='datetime-local'
                                    />
                                    <label className='doblbl w-full ' htmlFor="floatingdeadline">Deadline (DD-MM-YYYY HH:MM)</label>
                                </div>
                                {/* branch  */}
                                <fieldset className='md:col-span-2 '>
                                    <legend>Branch:</legend>
                                    <div className="branchdiv ">
                                        {renderBranchOptionsforDrive()}
                                    </div>
                                </fieldset>
                            </div>
                            <div className="horline"></div>

                            <div className="compbtn">
                                <button className='btn btn-secondary mx-2 my-2' onClick={() => { setisOpen(false) }}>Close</button>
                                {isReadOnly
                                    ? <button type='submit' className='btn btn-primary mx-2 my-2' onClick={handleEdit}>Edit</button>
                                    : <button type='submit' className='btn btn-primary mx-2 my-2' onClick={handleSubmit}>Save</button>
                                }
                            </div>
                        </form>

                    </div>
                </div>
            )}
            {/* --------------------Popup Ends-------------------- */}
        </div>
    )
}

export default SearchRes