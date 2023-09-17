import React from 'react'
import {useLoader} from '../context/LoaderContext'
import HashLoader from 'react-spinners/HashLoader';


function Loader() {

    const {loadingcont} = useLoader();

    return (
        <div className={`${loadingcont?'block':'hidden'} text-center fixed w-[100%] h-[85vh] flex z-[99999] justify-center items-center` }>
            <HashLoader

                color={'#0b5ed7'}
                loading={loadingcont}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader
