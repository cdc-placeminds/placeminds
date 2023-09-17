import React from 'react'


const handlesubmit=async()=>{
    const url = `${process.env.REACT_APP_BASE_URL}/api/sheetnames`
            const fetchMethods = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                })
            }
            const updateApplied = await fetch(url, fetchMethods);

            var sheets = await updateApplied.json();
            for (var sheet in sheets){
            console.log(sheets[sheet]);
            }
}

const DrivesScanner = () => {

    return (
        <div>
            <button type='button' onClick={handlesubmit}>Click</button>



        </div>
    )
}

export default DrivesScanner