import React from 'react'
import { RiLogoutCircleRLine } from "react-icons/ri";

const DropDownComp = ({signoutHandler , compClass}) => {
  return (
    <div className={`${compClass}`}>
        <div className="flex flex-col border px-2 rounded-md">
            <button className='flex gap-1 items-center' onClick={signoutHandler}>
            <RiLogoutCircleRLine /> Sign Out</button>
        </div>
    </div>
  )
}

export default DropDownComp