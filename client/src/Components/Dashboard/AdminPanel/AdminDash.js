import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useAlert } from '../../context/AlertContext';
import Alert from '../../Additonal/Alert';
import HashLoader from 'react-spinners/HashLoader';

const AdminDash = () => {

    const navigate = useNavigate();
    const { isAdmin } = useAdmin();
    const { alert, showalert } = useAlert();
    const [loading, setLoading] = useState(false);

    const checkisAdmin = () => {
        console.log("Checking Admin")
        console.log(isAdmin)
        if (!isAdmin) {
            navigate('/')
        }
    }

    useEffect(() => {
        checkisAdmin();

        // eslint-disable-next-line
    }, [])

    const [data, setData] = useState({
        name: "", location: "", profile: "", ctc: "", branch: [], year: "", deadline: ""
    })

    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault();

        const { name, location, profile, ctc, branch, year, deadline } = data;
        //Backend URL
        const url = `${process.env.REACT_APP_BASE_URL}/api/drive/newdrive`;
        //Fetch Api Methods Defining
        const fetchMethods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, location, profile, ctc, branch, year, deadline
            })
        }

        //Calling Fetch API
        const res = await fetch(url, fetchMethods);

        //Checking If any error occured 
        if (res.status === 201) {
            // -----------------------------------------------------------------------------------

            const sheeturl = `${process.env.REACT_APP_BASE_URL}/api/googleapi`
            const fetchMethod = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, location, profile, ctc, branch, year, deadline
                })
            }
            const addtosheet = await fetch(sheeturl, fetchMethod);

            setLoading(false)

            if (addtosheet.status === 201) {
                console.log("Add to sheet successful")
                console.log("Drive Created Successfully")
                showalert("Success: ", "Drive Added Successfully", "success")
            } else {
                console.log("Error")
            }
            // -----------------------------------------------------------------------------------

        }
        //If registration is successfull
        else {
            showalert("Error: ", "Fill Details Correctly", "warning")
            console.log("Unsuccessful")
        }

    }

    const handleBranchCheckboxChange = (e, selectedBranch) => {
        if (data.branch.includes(selectedBranch)) {
            // If branch is already selected, remove it from the array
            setData(prevData => ({
                ...prevData,
                branch: prevData.branch.filter(branch => branch !== selectedBranch)
            }));
        } else {
            // If branch is not selected, add it to the array
            setData(prevData => ({
                ...prevData,
                branch: [...prevData.branch, selectedBranch]
            }));
        }
    };

    const renderBranchOptions = () => {
        const branches = ['CSE', 'CST', 'IT', 'ITE', 'AIDS', 'AIML', 'ECE', 'EEE', 'MAE', 'ME']; // Add more branches if needed
        return branches.map((branch, index) => (
            <>
                <input
                    type="checkbox"
                    id={`branchChoice-${branch}`}
                    name="branch"
                    value={branch}
                    checked={data.branch.includes(branch)}
                    onChange={(e) => handleBranchCheckboxChange(e, branch)} />
                <label className='mr-[2.5%] ml-[0.5%]' htmlFor={`branchChoice-${branch}`}>{branch}</label>
            </>
        ));
    };

    const renderYearOptions = () => {
        const years = ['2023', '2024', '2025', '2026']

        return years.map((year, index) => (
            <option key={index} value={year}>
                {year}
            </option>
        ));
    };

    return (
        <div className="container-fluid homebody">

            <div className="col-md-6 md-12 mx-auto signupsec">
                <Alert alert={alert} />
                <div className="sgnhead">Create New Drive</div>
                <form className='register_frm' id='register_frm' method="POST" >
                    {loading && <div className='text-center absolute z-[999] top-[50%] left-[50%]' ><HashLoader

                        color={'#0b5ed7'}
                        loading={loading}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /></div>}
                    <div className=" grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-x-2 gap-y-2">

                        <div className="form-floating">
                            <input id='floatingcmpname' name='name' className="form-control" placeholder='' required value={data.name} onChange={handleInputs} type='text'></input>
                            <label className='w-full text-headcolor ' htmlFor="floatingcmpname">Company Name</label>
                        </div>
                        <div className="form-floating">
                            <input id='floatingcmplocation' name='location' className="form-control" placeholder='' required value={data.location} onChange={handleInputs} type='text'></input>
                            <label className='w-full text-headcolor ' htmlFor="floatingcmplocation">Location</label>
                        </div>
                        <div className="form-floating">
                            <input id='floatingcmpctc' name='ctc' className="form-control" placeholder='' required value={data.ctc} onChange={handleInputs} type='text'></input>
                            <label className='w-full text-headcolor ' htmlFor="floatingcmpctc">CTC</label>
                        </div>

                        <div className="form-floating">
                            <input id='floatingcmpprofile' name='profile' className="form-control" placeholder='' required value={data.profile} onChange={handleInputs} type='text'></input>
                            <label className='w-full text-headcolor ' htmlFor="floatingcmpprofile">Job Profile</label>
                        </div>

                        <div className="form-floating">
                            <select
                                className="form-select text-center"
                                id="floatingcmpyear"
                                name="year"
                                value={data.year}
                                onChange={handleInputs}
                                required
                            >
                                <option value="">Passing Out Year</option>
                                {renderYearOptions()}
                            </select>
                            <label className='w-full text-headcolor ' htmlFor="floatingcmpyear">Passing Out Year</label>
                        </div>

                        <div className="form-floating">
                            <input
                                id='floatingcompdeadline'
                                name='deadline'
                                className="form-control  text-center"
                                placeholder="(DD/MM/YYYY | HH:MM)"
                                required
                                value={data.deadline}
                                onChange={handleInputs}
                                type='datetime-local'
                            />
                            <label className='doblbl w-full ' htmlFor="floatingcompdeadline">Deadline (DD-MM-YYYY HH:MM)</label>
                        </div>

                        <div className="form-floating md:col-span-2">
                            {/* <select
                                className="form-select text-center"
                                id="floatingBranch"
                                name="branch"
                                value={data.branch}
                                onChange={handleInputs}
                                required
                            >
                                <option value="">Select Branch</option>
                                {renderBranchOptions()}
                            </select>
                            <label className='w-full text-headcolor ' htmlFor="floatingBranch">Branch</label> */}

                            <fieldset className='md:col-span-2 '>
                                <legend>Branch:</legend>
                                <div className="branchdiv ">
                                    {renderBranchOptions()}
                                </div>
                            </fieldset>
                        </div>

                        {/* <input id='inptbox' value={data.year} onChange={handleInputs} name='year' type='text'></input> */}

                    </div>
                </form>
                <div className="sgnbtn">

                    <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Create Drive</button>
                </div>
            </div>

        </div>
    )
}

export default AdminDash