import Userdata from '@/PagesData/Pages/Userdata';
import { Button, Card, CardHeader, Spinner, Typography } from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react'

function User() {
    const[data_availability,setData_availability]=useState(null);
    const[pageloader,setPageloader]=useState(false);
    const[pagedata,setPagedata]=useState(false);
    const [pageid,setPageid]=useState('')
    const[search_value,setSearch_value]=useState('')


const token= localStorage.getItem('authtoken');
    
    const user_data = async (search) => {
    
    try {
      setPageloader(true)
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/admin/users?${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      })
      const data = await response.json();
      if (data.success === true) {
        setPageloader(false)
       console.log(data)
    setPagedata(data.result)
       if(data.result.data[0]){
        setData_availability('No Data...')
       }
       
      } else {
        setPageloader(false)
      }
      console.log(data)
    }
    catch (error) {
      
    }
  }
  const search_data=()=>{
    const searching=(`search=${search_value}`)
    user_data(searching)

  }
  useEffect(()=>{
    user_data();
  },[]);
  return (
    <>
        <CardHeader variant="gradient" color="gray" className="p-7 mt-8 z-20">
              <Typography variant="h6" color="white">
                Users
              </Typography>
            </CardHeader>
            <Card className="px-5 py-10 -mt-10">
                <label className='pt-8'>
                    Search
                 <div className="flex gap-3 -mt-3">
          <div className="relative w-full max-w-3xl">
            <span className="fa-solid fa-search absolute left-3 top-9 transform -translate-y-1/2 text-gray-500"></span>
            <input
             value={search_value}
             onChange={(e)=>{setSearch_value(e.target.value)
              search_data();
             }}
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 mt-4 rounded-xl  w-full focus:outline-none border border-silver/30 "
            />
            <button
          
            className="fa-solid fa-close absolute top-7 right-4" onClick={()=>{setSearch_value('')
              search_data(search_value)
            }}/>
          </div>

          <div>
            <label className='flex'>
 <input type="checkbox" className='w-5 h-5 mt-7 ml-4 '
             />
             &nbsp;<p className='mt-[25px]'> Only Show Verified Users</p>
            </label>
          </div>

          <div>
           
           
          </div>
        </div>
        </label>
        <div className="flex gap-3 pb-6">
          <div className="relative w-full max-w-sm">
            <span className="fa-solid fa-search absolute left-3 top-9 transform -translate-y-1/2 text-gray-500"></span>
            <input
             value={search_value}
             onChange={(e)=>{setSearch_value(e.target.value)
             }}
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 mt-4 rounded-lg shadow w-full focus:outline-none border"
            />
            <button
          onClick={()=>{setSearch_value('')
              search_data(search_value)}}
            className="fa-solid fa-close absolute top-7 right-4"/>
          </div>

          <div>
            <Button className=" px-4 py-3 text-xs  mt-[17px]"
            onClick={()=> search_data()}
            >
              SEARCH
            </Button>
          </div>

          
        </div>

        <div>
          <table className="table-auto w-full text-left">
            <thead className="text-silver text-[11px] ">
              <tr>
                <th className="relative px-4">
                  USER
                </th>
                <th className="relative px-4">
                  ADDRESS
                </th>
                <th className="relative px-4">
                  REGISTERED AT
                </th>
                <th className="relative px-4">VERIFIED AT</th>
             
                <th className="relative px-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 text-left">


              <Userdata pagedata={pagedata} user_data={user_data} pageid={pageid}/>






              
              
            </tbody>
          </table>
          {pageloader?(
  <div className="w-full" >
    <div c className="text-center flex justify-center w-full border-t pt-6">
      <div>
<Spinner />
</div>
    </div>
  </div>
):data_availability && (
                <div className="" >
                  <div  className="flex  justify-center  font-light py-2 pt-4 w-full text-silver  border-t mt-4">
                    <div className="text-sm"> {data_availability}</div>
                   
                  </div>
                </div>
)
}

        </div>
      </Card >
    </>
  )
}

export default User
