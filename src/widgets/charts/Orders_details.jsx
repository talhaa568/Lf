import AddOrders from '@/PagesData/Pages/AddOrders';
import Orders_table from '@/PagesData/Pages/Orders_table';
import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function Orders_details() {
  const params = useParams();
  const pageid = params.orderid
  const token = localStorage.getItem('authtoken')
  const [pagedata, setPagedata] = useState('');

  const order_data = async () => {
    try {
      const response = await fetch(` https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/admin/orders/${pageid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
      const data = await response.json();
      if (data.success === true) {
        setPagedata(data.result)
      }
    }
    catch (error) {
      console.log('error occur while fetching')
    }
  }
  useEffect(() => {
    order_data();
  }, []
  )
  return (
    <>
      <div className='mb-6'>
        <h1 className='text-3xl font-semibold text-gray-800'>
          Order #{pagedata.number}
        </h1>
        <p className=' text-gray-500 text-sm '>
          Order ID: {pageid}
        </p>
      </div>
      <Card className='p-6'>
        <div className='flex justify-between '>
          <div >
            <Typography className='font-semibold text-black/80 '>Created At: <span className='font-normal text-gray-700'> {pagedata.created_at || '-'}</span> </Typography>
            <Typography className='font-semibold text-black/80 '>Note: <span className='font-normal text-gray-700'> {pagedata.note || 'No additional notes'} </span> </Typography>
            <Typography className='font-semibold text-black/80 '>Revenue: <span className='font-normal text-gray-700'> {pagedata.revenue} </span> </Typography>
          </div>
          <div>
            <Button>Finalize</Button>
          </div>
        </div>
        <hr className='border-gray-300 my-4' />
        <div className='flex justify-center gap-4'>
          <Card className='p-5 w-full border '>
            <h1 className='text-black/80 font-semibold text-xl'>Pickup Information</h1>
            <p className='font-semibold text-black/70'>Date: <span className='font-normal text-black/60'>{pagedata?.pickup?.date || '-'}</span></p>
            <p className='font-semibold text-black/70'>Time: <span className='font-normal text-black/60'>{pagedata?.pickup?.time || '-'}</span></p>
          </Card>
          <Card className='p-5 w-full border'>
            <h1 className='text-black/80 font-semibold text-xl'>Dropoff Infomation</h1>
            <p className='font-semibold text-black/70'>Date: <span className='font-normal text-black/60'>{pagedata?.dropoff?.date || '-'}</span></p>
            <p className='font-semibold text-black/70'>Time <span className='font-normal text-black/60'>{pagedata?.dropoff?.time || '-'}</span></p>
          </Card>
        </div>
      </Card>
      <Orders_table pageid={pageid} pagedata={pagedata} order_data={order_data} />
    </>
  )
}

export default Orders_details
