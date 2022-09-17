import React from 'react'
import Swal from 'sweetalert2'
const ConfirmMessage = ({ confirmated }) => {
    //ToDo: Change data of message
    const confirmM = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success',
                    confirmated(false)
                )
            } else {
                confirmated(true)
            }
        })
    }
    return (
        <>
            {confirmM()}
        </>
    )
}
export default ConfirmMessage