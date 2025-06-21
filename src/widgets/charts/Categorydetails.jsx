import { Card, CardBody, CardHeader, Spinner, Switch, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Categorydetails_info from '../cards/Categorydetailsinfo';
import Category_items from '../cards/Category_items';
function Categorydetails() {
  const token = localStorage.getItem('authtoken')
  const params = useParams();
  const pageid = params.categoryid;
  const [pageloader, setPageloader] = useState(false)
  const [pagedata, setPagedata] = useState('')

  const category_info = async () => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/item-categories/${pageid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      }
      )
      const data = await response.json();
      if (data.success === true) {
        console.log(data)
        setPagedata(data.result)
      }
    }
    catch (error) {
    }
  }
  useEffect(() => {
    category_info();
  }, [])
  return (
    <>
      <div className='my-3 mb-8'>
        <Typography className='font-semibold text-3xl text-black/80'>Category:<span> {pagedata.name}</span></Typography>
        <Typography className='text-sm font-medium text-black/40'>Category ID:<span> {pagedata.id}</span></Typography>
      </div>
      {pageloader &&
        <div className='flex justify-center '>
          <Spinner />
        </div>
      }
      <div>
        <Categorydetails_info category_info={category_info} pagedata={pagedata} />
        <Category_items category_info={category_info} pagedata={pagedata} />
      </div>
    </>
  )
}
export default Categorydetails
