import React from 'react'
import "./Attendence.css"
import { Link } from 'react-router-dom'

const Attendence = () => {
    return (
        <div>
            <div className=" attend-cont ">
                <div className="first flex ">
                    <img className='att-img' src="https://imgs.search.brave.com/F7Vf9V1-zH08igTAdBTiSGdac1DTt1h1LGbeKi7Awr8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MTQ2ODAzNzY3Mzkt/NDE0ZDk1ZmY0M2Rm/P2F1dG89Zm9ybWF0/JmZpdD1jcm9wJnE9/ODAmdz0xMDAwJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRoOGZH/bGpiMjU4Wlc1OE1I/eDhNSHg4ZkRBPQ.jpeg" alt="" srcset="" />
                </div>
                <Link to="/make">
                    <div className="second flex">
                        Take Attendence
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Attendence