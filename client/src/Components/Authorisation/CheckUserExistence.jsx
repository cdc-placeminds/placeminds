import { useEffect, useState } from 'react';

function CheckUserExistence(varName, varValue) {
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        if (varValue) {
            const userCheck = { varname: varName, varval: varValue };
            fetch(`${process.env.REACT_APP_BASE_URL}/api/check-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userCheck)
            })
            .then(response => response.json())
            .then(data => {
                setUserExists(data.exists);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [varName, varValue]);

    return userExists;
}

export default CheckUserExistence;
