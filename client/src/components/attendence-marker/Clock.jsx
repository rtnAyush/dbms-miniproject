import { useState } from "react"

const Clock = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString());

    const handleTime = () => {
        setTime(new Date().toLocaleTimeString());
    }

    setInterval(handleTime, 1000)

  return (
    <span>
      {time}
    </span>
  )
}

export default Clock
