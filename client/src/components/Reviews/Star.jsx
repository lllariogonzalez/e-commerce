export default function Star({state, size}) {
  return(
    <div>
      {state ?
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width={size === 'big' ? "32" : "16"} height={size === 'big' ? "32" : "16"} viewBox="0 0 24 24" strokeWidth="2" stroke="#d9534f" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg> :
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width={size === 'big' ? "32" : "16"} height={size === 'big' ? "32" : "16"} viewBox="0 0 24 24" strokeWidth="2" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
      </svg>
      }
    </div>
  )
}