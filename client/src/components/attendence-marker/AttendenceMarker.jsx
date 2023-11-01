import React from 'react'
import useGeoLocation from '../../hooks/useLocation'

export default function AttendenceMarker() {

    const location = useGeoLocation();
    return (
        <div className='location'>
            {
                location.loaded
                    ? JSON.stringify(location)
                    : "Location data not available yet."
            }
        </div>
    )
}
