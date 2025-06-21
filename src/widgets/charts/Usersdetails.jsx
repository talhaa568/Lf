import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function Usersdetails() {
  const params = useParams();
  const pageid = params.userid;
  const [pagedata, setPagedata] = useState('')
  const token = localStorage.getItem('authtoken');
  const user_data = async () => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/admin/users/${pageid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      })
      const data = await response.json();
      if (data.success === true) {
        setPagedata(data.result)
      }
    }
    catch (error) {
    }
  }
  useEffect(() => {
    user_data();
    console.log(pagedata)
  }, []);
  useEffect(() => {
    console.log(pagedata)
  }, [pagedata]);
  return (
    <>
      <div className='mb-8' >
        <h1 className='text-3xl text-gray-800 font-semibold'>Name:{pagedata.full_name || '-'} </h1>
        <p className='text-gray-500 text-sm'>
          User ID: {pageid || '-'}
        </p>
      </div>
      <Card className='p-6'>
        <div className='flex justify-between '>
          <div >
            <Typography className='font-semibold text-black/80 '>Name: <span className='font-normal text-gray-700'>{pagedata.full_name || '-'} </span> </Typography>
            <Typography className='font-semibold text-black/80 '>Email: <span className='font-normal text-gray-700'>{pagedata.email || '-'}  </span> </Typography>
            <Typography className='font-semibold text-black/80 '>Phone: <span className='font-normal text-gray-700'>{pagedata.phone || '-'}  </span> </Typography>
          </div>
        </div>
        <hr className='border-gray-300 my-4' />
        <div className='flex justify-center gap-4'>
          <Card className='p-5 w-full border '>
            <h1 className='text-black/80 font-semibold text-xl'>Address</h1>
            <p className='font-semibold text-black/70'>City: <span className='font-normal text-black/60'>{pagedata?.address?.city || '-'}</span></p>
            <p className='font-semibold text-black/70'>Postcode: <span className='font-normal text-black/60'>{pagedata?.address?.postcode || '-'}</span></p>
            <p className='font-semibold text-black/70'>Street Address: <span className='font-normal text-black/60'>{pagedata?.address?.line_1 || '-'}</span></p>
            <p className='font-semibold text-black/70'>Country: <span className='font-normal text-black/60'>{pagedata?.address?.country || '-'}</span></p>
          </Card>
          <Card className='p-5 w-full border'>
            <h1 className='text-black/80 font-semibold text-xl'>Infomation</h1>
            <p className='font-semibold text-black/70'>Email Verified at: <span className='font-normal text-black/60'>{pagedata?.email_verified_at || '-'}</span></p>
            <p className='font-semibold text-black/70'>Active Address: <span className='font-normal text-black/60'>{pagedata?.has_active_address ? 'Yes' : 'No'}</span></p>
            <p className='font-semibold text-black/70'>Price Preview: <span className='font-normal text-black/60'>{pagedata?.price_review_reqired ? 'Yes' : 'No'}</span></p>
            <p className='font-semibold text-black/70'>Shirt Handling Method: <span className='font-normal text-black/60'>{pagedata?.shirt_handling || '-'}</span></p>
          </Card>
        </div>
      </Card>
    </>
  )
}

export default Usersdetails
