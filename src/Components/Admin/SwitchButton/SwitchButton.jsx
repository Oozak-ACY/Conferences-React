import { useState } from "react"

export default function SwitchButton (props) {
    

    const handleClick = () => {
        props.setBtnConf(!props.btnConf);
        props.setBtnUsers(!props.btnUsers);
    }

    return (
        <div className='w-1/3 h-16  bg-zinc-500 rounded-3xl p-2 flex items-center justify-between'>
            <button className={`h-full w-[49%] rounded-3xl font-bold text-xl text-zinc-200 ${props.btnUsers ? 'bg-amber-600 hover:bg-amber-700' : 'bg-zinc-400 hover:bg-slate-400'}`} onClick={handleClick}>
                Utilisateurs
            </button>
            <button className={`h-full w-[49%] rounded-3xl font-bold text-xl text-zinc-200 ${props.btnConf ? 'bg-amber-600 hover:bg-amber-700' : 'bg-zinc-400 hover:bg-slate-400'}`}  onClick={handleClick}>
                Conférences
            </button>

        </div>
    )
}