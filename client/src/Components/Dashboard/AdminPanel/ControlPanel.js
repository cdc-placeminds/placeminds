import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { useAlert } from '../../context/AlertContext';
import Alert from '../../Additonal/Alert';
// import HashLoader from 'react-spinners/HashLoader';


const ControlPanel = () => {

    const[sFor,setSFor]=useState(false);
    

    // usestate for handling input 
    //update data that user is entering
    const [data, setData] = useState({
        searchFor:'',searchBy: "", searchinp: ""
    })

    const handleInputs = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    // states for checking if user is an admin 
    const navigate = useNavigate();
    const { isAdmin } = useAdmin();
    const { alert, showalert } = useAlert();
    // const [loading, setLoading] = useState(false);

    const checkisAdmin = () => {

        if (!isAdmin) {
            navigate('/')
        }
    }

    //  admin check on every render 
    useEffect(() => {
        checkisAdmin();
        // eslint-disable-next-line
    }, [])

    //    ------------------ admin check completed ----------------

    // -------------------searchFOr options ---------

    const renderSearchForOptions = () => {
        const searches = ['Student', 'Drive']; // Add more searches if needed
        return searches.map((search, index) => (
            <option key={index} value={search}>
                {search}
            </option>
        ));
    };


    // for search options 

    const renderSearchOptions = () => {
        const searches = ['email', 'enrollment', 'name']; // Add more searches if needed
        return searches.map((search, index) => (
            <option key={index} value={search}>
                {search}
            </option>
        ));
    };


//    --------------------------- search for fn ------------------
  const handleSearchFor=()=>{
  
    console.log("inside search for ");

    setSFor(true);


  }



// ------------------search by fn ---------------------------

const handleSearchBy=(e)=>{
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("inside search by ");
     const searchelem={searchBy:data.searchBy,searchInp:data.searchinp}
    fetch(`${process.env.REACT_APP_BASE_URL}/api/check-user/findusers`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(searchelem)  
    }).then(response=>response.json())
    .then(data=>{
        console.log("inside res of searchby");
        
        console.log(data);

    })
    .catch(error=>{
       console.log(error);
    });



}

   




    // --------html part ----------------------------
    return (
        <div className='md:w-10/12 w-full mx-auto'>
            <h1 className="text-bold text-center text-[25px] text-headcolor hover:text-warn"> Control Panel</h1>
            <div className="searchsec grid grid-cols-1 md:grid-cols-2 grid-flow-row">
                {/* form starts ---------------  */}
                <div className="formsec m-[10%] text-center">
                    <form className='register_frm' id='register_frm'  onSubmit={handleSearchBy}>

                 {/* --------------search for----------  */}

                {!sFor&&(
                    <>
                    <div className="form-floating  ">
                            <select
                                className="form-select text-center"
                                id="floatingSearchFor"
                                name="searchFor"
                                value={data.searchFor}
                                onChange={handleInputs}
                                required
                            >
                                <option value="">Search For </option>
                                {renderSearchForOptions()}
                            </select>
                            <label className='w-full text-headcolor ' htmlFor="floatingSearchFor">Search For</label>
                        </div>

                        {/* button for search  */}
                        <button className='btn btn-primary w-fit mt-[7px]' onClick={handleSearchFor}> Next </button>
                    </>


                )}

                {/* --------------------search by ----------------------------- */}
                {sFor&&(
                    <>
                    <div className="form-floating ">
                            <select
                                className="form-select text-center"
                                id="floatingSearchBy"
                                name="searchBy"
                                value={data.searchBy}
                                onChange={handleInputs}
                                required
                            >
                                <option value="">Search By </option>
                                {renderSearchOptions()}
                            </select>
                            <label className='w-full text-headcolor ' htmlFor="floatingSearchBy">Search By</label>
                        </div>
                        <div className="form-floating">
                                <input id='floatingenrollment'  name='searchinp' className={`form-control `} placeholder='' required value={data.searchinp} onChange={handleInputs} type='text' inputMode='numeric'></input>
                                <label className='w-full text-headcolor ' htmlFor="floatingenrollment">Enter {data.searchBy}</label>
                            </div>


                        {/* button for search  */}
                        <button className='btn btn-primary w-fit mt-[7px]' onClick={handleSearchFor}> Search </button>
                    </>


                )}

                       

                    </form>

                </div>

                {/* form ends------------------- */}

                {/* result for search --------------------- */}
                <div className="serchres">



                </div>

                {/* search result ends ------------------ */}

            </div>
        </div>
    )
}

export default ControlPanel
