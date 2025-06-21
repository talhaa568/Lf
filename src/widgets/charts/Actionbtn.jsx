import { Card, Typography, CardHeader, Spinner, Slider, Switch } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
function Actionbtn() {
  const params = useParams();
  const action = params.id;
  const [areaeditchecker, setAreaeditchecker] = useState(false)
  const [error, setError] = useState(false)
  const [areadel, setAreadel] = useState(false)

  const [postcode_error, setpPostcode_error] = useState()
  const [confirmdel, setConfirmdel] = useState(null)
  const [showNew, setShowNew] = useState(false);
  const [loader, setLoader] = useState(true)
  const [areaname, setAreaname] = useState('')

  const [tableloader, setTableloader] = useState(false)
  const [postCodes, setPostCodes] = useState()
  const [fetcherror, setFetcherror] = useState("")
  const [table, SetTable] = useState()
  const [createcode, setCreatecode] = useState()
  const [area, setArea] = useState(null);
  const token = localStorage.getItem("authtoken")

  const tabledata = async () => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/areas/${action}`, {
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
        setLoader(false)
        setArea(data.result)
        setPostCodes(data.result.postcodes)
        setError(false)
      }
      SetTable(data.result);
    }

    catch (n) {
      setFetcherror('Failed to Fetch Data')
      setLoader(false)
      setError(true)
    }
  }
  const areaedit = async () => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/areas/${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
        body: JSON.stringify({
          name: areaname,
        }),
      }
      )
      const data = await response.json();
      if (data.success === true) {
        setLoader(false)
        tabledata();
        toast.success('The Name Has Been Changed')
        setAreaeditchecker(null)
        setError(false)
      }
      SetTable(data.result);
      console.log(data)
    }
    catch (n) {
      setFetcherror('Failed to Fetch Data')
      setLoader(false)
      setError(true)
    }
  }
  const updateslot = async (slotid, slot) => {
    try {
      setTableloader(true)
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/slot-availabilities/${slotid}/change-state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
        body: JSON.stringify({
          is_active: !slot.is_active,
        }),
      }
      )
      const data = await response.json();
      if (data.success) {
        setTableloader(false)
        tabledata();
        toast.success('Slot Deactivated successfully ✅');
      }
    }
    catch (error) {

    }
  }
  const update_postcode = async (codeid, postcode) => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/postcodes/${codeid}/change-state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
        body: JSON.stringify({
          is_active: !postcode.is_active,
        }),
      }
      )
      const data = await response.json();

      if (data.success) {
        if (postcode.is_active === true) {
          toast.success('Post Code  Deactivated Successfully', {
            position: 'bottom-center',

          })

        }
        else {
          toast.success('Post Code Activated Successfully', {
            position: 'bottom-center',

          })
        }
        tabledata();
      }
    }
    catch (error) {
    }
  }
  const create_postcode = async () => {
    try {
      setpPostcode_error("")
      console.log(createcode)
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/postcodes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,

        },
        body: JSON.stringify({
          postcode: createcode,
          area_id: action,
        }),
      }
      )
      const data = await response.json();
      console.log(data)
      if (data.success) {
        setShowNew(false)
        setpPostcode_error("")
        toast.success("Postcode created successfully ✅");
        tabledata();
      }
      else {
        setpPostcode_error(data.errors.postcode)
        toast.error('Error While Creating Post Code')
      }
    }
    catch (error) {
    }
  }
  const delete_postcode = async (codeid, postcode) => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/postcodes/${codeid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      }
      )
      const data = await response.json();
      if (data.success === true) {
        setFetcherror("")
        setConfirmdel(null)
        tabledata();
        toast.success('Postcode Deleted ')
      }
    }
    catch (error) {
    }
  }
  const delete_area = async () => {
    try {

      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/areas/${action}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },

      }
      )
      const data = await response.json();

      if (data.success === true) {
        setFetcherror("")
        toast.success('Area Deleted')
        setConfirmdel(null)
        tabledata();
      }
    }
    catch (error) {


    }
  }


  useEffect(() => {
    tabledata()
  }, [action]);
  return (
    <div className=''>
      {loader ? (
        <div className=' h-[500px] flex justify-center items-center'>
          <Spinner className='h-10 w-10' />
        </div>
      ) : (
        <div>
          {error ? (
            <>
              <p className='text-red-600'>{fetcherror}</p>
            </>
          ) : (
            <>
              <div>
                <Typography className='text-3xl opacity-70 font-semibold'>Area:  {area.name} </Typography>
                <p className='text-inherit opacity-40 '>Area ID: {params.id}</p>
                <Card className='p-5 py-8 mt-5 flex justify-between'>
                  <div className='flex justify-between '>
                    <div>
                      <Typography className='font-semibold text-lg text-black/70 '>Name: <span className='font-normal'>{area.name}</span></Typography>
                      <Typography className='font-semibold text-lg text-black/70'>Total Postcodes: <span className='font-normal'>{area.postcodes.length}</span></Typography>
                      <Typography className='font-semibold text-lg text-black/70 ' >Active Postcodes: <span className='font-normal'>{area?.postcodes?.filter((p) => p.is_active)?.length}</span></Typography>
                    </div>
                    <div>
                      <span role="button" onClick={() => setAreadel(true)} className=' inline-block mr-1 font-bold text-red hover:bg-red-100 text-red-600 px-4 py-2 rounded rounded-lg mt-3 text-xs'>DELETE</span>
                      <span role="button" onClick={() => setAreaeditchecker(true)} className=' inline-block mr-5 md:mr-8 lg:mr-10 font-bold mt-3 hover:bg-lightsilver px-4 py-2 text-silver rounded rounded-lg text-xs'>EDIT</span>
                    </div>
                  </div>
                  <div>
                  </div>
                </Card>
              </div>
              <Card className='mt-16 p-3 '>
                <CardHeader variant="gradient" color="gray" className="p-5   z-20 text-center">
                  <Typography variant="h6" color="white">
                    {area.name} Week days
                  </Typography>
                </CardHeader>
                <div className='px-4 text-sm'>
                  <table className="w-full  table-auto  mt-5 ">
                    <thead className=''>
                      <tr className='font-semibold text-[10px] text-inherit opacity-80 '>
                        <td>WEEKDAYS</td> <td className='flex justify-center'> TIME SLOT</td>
                      </tr>
                    </thead>
                    {tableloader ? (
                      <div className=' h-96 flex justify-center items-center w-full '>
                        <Spinner />
                      </div>
                    ) : (<tbody >
                      {area?.slot_availabilities?.map((day, index) => {
                        return (
                          <tr key={index} className='border-t'>
                            <td className="py-2 font-medium text-gray-900">{day.weekday}</td>
                            <td className='flex flex-wrap justify-center py-4 gap-4'>
                              {
                                day.slots.map((slot, i) => {
                                  return (
                                    <button onClick={() => updateslot(slot.availability_id, slot)} key={i} className={`px-4 py-2  inline-block   rounded-lg font-semibold text-[12px]
        ${slot.is_active ? "border border-green-400 text-green-700 bg-green-100" : 'border border-red-400 text-red-700 bg-red-100'} `} >{slot.slot}</button>
                                  )
                                }
                                )
                              }
                            </td>
                          </tr>
                        )
                      }
                      )
                      }
                    </tbody>)}
                  </table>
                </div>
              </Card>
              <Card className='mt-16'>
                <CardHeader variant="gradient" color="gray" className="p-6  flex justify-between z-20 text-start">
                  <Typography variant="h6" color="white">
                    Post Codes

                  </Typography>
                  <span role='button' onClick={() => setShowNew(true)} className='fa-solid fa-plus px-4 py-2 bg-white hover:bg-lightsilver text-black rounded '></span>
                </CardHeader>
                <div className='px-5'>
                  <table className='w-full text-left'>
                    <thead className='my-4'>
                      <tr className='text-[10px] '>
                        <th className='py-4'>
                          POST CODE
                        </th>

                        <th>
                          ACTIVE
                        </th>
                        <th className='px-4'>
                          ACTION
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        postCodes.map((code, index) => (
                          <tr key={index} className='border-t font-semibold text-black'> <td>{code.postcode}
                          </td>
                            <td className='py-4 '>
                              <Switch checked={code.is_active} onClick={() => { update_postcode(code.id, code) }} />
                            </td>
                            <td onClick={() => setConfirmdel(code)} className='text-red-800 text-xs'>
                              <button className=' rounded rounded-lg   hover:bg-red-100 px-4 py-2'>DELETE</button>

                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}

        </div>
      )}

      {showNew && (
        <Card>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300">
            <div className="bg-white rounded-lg p-6 px-10 py-10 w-[90%] max-w-md shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-xl text-gray-500  hover:scale-90 transform transform-transition duration-100"
                onClick={() => setShowNew(false)}
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold mb-4">Add New Postcode</h3>
              <input
                type="text"
                placeholder="e.g. KT2R 2RF"
                value={createcode}
                onChange={(e) => setCreatecode(e.target.value)}
                className="w-full p-2  mt-1 border rounded mb-4"
              />
              <p className='text-sm text-red-600'>{postcode_error}</p>
              <button
                onClick={() => create_postcode()}

                className="bg-black text-white mt-4 px-4 py-2 rounded rounded-lg w-full hover:scale-95 transform transform-transition duration-300"
              >
                Create Postcode
              </button>
            </div>
          </div>
        </Card>
      )}
      {confirmdel && (
        <Card >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300">
            <div className="bg-white rounded-lg  p-4 py-7 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500  hover:scale-90 transform transform-transition duration-100"
                onClick={() => setConfirmdel(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl text-gray-800 font-semibold mb-6">Delete Confirmation</h3>
              <p className='text-sm text-gray-600 font-normal mb-6'>Are You Sure You Want To Delete This Postcode ({confirmdel.postcode})?</p>
              <div className='flex justify-end gap-4'>
                <button
                  onClick={() => setConfirmdel(null)}
                  className="hover:bg-red-100 text-red-600 mt-4 px-8 py-3 rounded rounded-lg  font-semibold hover:scale-95 transform transform-transition duration-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => delete_postcode(confirmdel.id)}

                  className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg  hover:scale-95 transform transform-transition duration-200"
                >
                  CONFIRM
                </button>
              </div>
            </div>
          </div>

        </Card>
      )}
      {areaeditchecker && (
        <Card >

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300">
            <div className="bg-white rounded-lg  p-4 py-10 px-10 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 p-3 hover:scale-90 transform transform-transition duration-100"
                onClick={() => setAreaeditchecker(false)}
              >
                &times;
              </button>
              <h3 className="text-2xl text-gray-800 font-semibold mb-6">Area</h3>
              <label className='text-gray-900 font-semibold' >Name
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={areaname}
                  onChange={(e) => setAreaname(e.target.value)}
                  className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 font-normal"
                  required
                />
              </label>
              <div className='flex justify-end gap-4'>

                <button
                  onClick={() => areaedit()}

                  className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg  hover:scale-95 transform transform-transition duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}
      {areadel && (
        <Card >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300">
            <div className="bg-white rounded-lg  p-4 py-7 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500  hover:scale-90 transform transform-transition duration-100"
                onClick={() => setAreadel(false)}
              >
                &times;
              </button>
              <h3 className="text-2xl text-gray-800 font-semibold mb-6">Delete Confirmation</h3>
              <p className='text-sm text-gray-600 font-normal mb-6'>Are You Sure You Want To Delete This Area ({table.name})?</p>
              <div className='flex justify-end gap-4'>
                <button
                  onClick={() => setAreadel(false)}
                  className="hover:bg-red-100 text-red-600 mt-4 px-8 py-3 rounded rounded-lg  font-semibold "
                >
                  Cancel
                </button>
                <Link
                  to="/dashboard/area"
                  onClick={() => delete_area()}
                  className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg  hover:scale-95 transform transform-transition duration-200"
                >
                  CONFIRM
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export default Actionbtn
