import React from 'react'

function Alert(props) {
    return (
        props.alert && <div className={`text-center h-[25px] flex justify-center items-center mb-[5px] alert alert-${props.alert.type}  fade show`} role="alert">
            <strong>{props.alert.head}</strong> {props.alert.msg}
        </div>
    )
}

export default Alert