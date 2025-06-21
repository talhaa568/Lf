import React from 'react'
import { Link } from 'react-router-dom'

function Userdata({pagedata, user_data, pageid}) {
  return (
    <>
      {pagedata?.data?.map((data,index)=>(
        <tr key={index} className='border-t font-semibold text-sm'>
            <td className='pl-4 py-4'>
                {data.full_name ||'-'}
                <br />
                {data.email ||'-'}
                <br />
                {data.phone ||'-'}
            </td>
            <td>
                {data.address.line_1}
                <br />
               
                {data.address.postcode ||'-'}
            </td>
            <td>
                {data.created_at.split(" ")[0] ||'-'}
            </td>

             <td>

                {data?.email_verified_at?.split(" ")[0] ||'-'}
            </td>
             <td role='button'  >
                                     <Link to={`/dashboard/admin/users/${data.id}`} className='  text-gray-600 py-2 px-4 fa-solid fa-arrow-right hover:bg-lightsilver rounded rounded-lg hover:bg-opacity-30'></Link>
                                    </td>


        </tr>
      )
    
    
    )}
    </>
  )
}

export default Userdata
