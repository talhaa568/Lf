import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { Card, CardBody, CardHeader, Dialog, Slider, Spinner, Switch, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Category() {

  const [response, setResponse] = useState([])
  const [Pageloader, setPageloader] = useState(false)
  const [is_addcategory, setIs_addcategory] = useState(false)
  const [default_handlingerror, setDefault_handlingerror] = useState(null)
  const [name_error, setName_error] = useState(null)
  const [position_error, setPosition_error] = useState(null)
  const [handlingerror, setHandlingerror] = useState(null)
  const [Formerror, setformerror] = useState(null)

  const [catname, setCatName] = useState('')
  const [catposition, setCatPosition] = useState('')
  const [catdescription, setCatdescription] = useState('')
  const [default_handling_option, setDefault_handling_option] = useState('')
  const [is_foldable, setIs_foldable] = useState(false)
  const [is_hangable, setIs_hangable] = useState(false)
  const [fetcherror, setFetcherror] = useState('')
  const [errorclass, setErrorclass] = useState('')

  const token = localStorage.getItem('authtoken')
  const Validationschema = Yup.object({
    name: Yup.string().required('Name is Required'),
    position: Yup.string().required('Position is Required'),
  })



  const categorydata = async () => {
    try {
      setPageloader(true)
      const response = await fetch('https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/item-categories', {
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
        setResponse(data.result)
        setFetcherror(null)
        setErrorclass(null)
      } else {
        setFetcherror(data.message)
        setErrorclass('text-red-600 text-center text-sm border-t w-full mt-3 pt-4 my-3')
        setPageloader(false)
      }
      console.log(data)
    }
    catch (error) {
      setFetcherror('Failed to Fetch Data');
      setErrorclass('text-red-600 text-center text-sm border-t pt-4 my-3');
      setPageloader(false)
    }
  }

  const addcategory = async () => {
    try {
      if (!is_foldable && !is_hangable) {
        setHandlingerror('You must choose at least one handling option');
        return;
      }
      const response = await fetch('https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/item-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify({
          default_handling_option,
          is_foldable,
          is_hangable,
          description: catdescription,
          position: catposition,
          name: catname,
        })
      })
      const data = await response.json();
      if (data.success) {
        console.log(data)
        toast.success('Category Created Successfully')
        categorydata();
        setIs_addcategory(false)
        setPageloader(false)
      }
      else {
        setDefault_handlingerror(data.errors?.default_handling_option?.[0])
        toast.error('An Error Occurs While Creating Category')
        setName_error(data.errors?.name)
        setPosition_error(data.errors?.position)
        if (is_foldable || is_hangable) {
          setHandlingerror(null)
        } else if (is_foldable) {
          setHandlingerror(data.errors?.is_hangable)
        } else {
          setHandlingerror(data.errors?.is_foldable)
        }
      }
    }
    catch (error) {
      setIs_addcategory(false)
    }
  }

  useEffect(() => {
    categorydata();
  }, []);

  return (
    <>
      <CardHeader variant="gradient" color="gray" className="p-6 mt-10 z-20 flex justify-between">
        <Typography variant="h6" color="white" >
          Category
        </Typography>
        <Typography role='button' className='fa-solid fa-plus bg-white text-black px-4  py-1 rounded-lg hover:bg-lightsilver' onClick={() => setIs_addcategory(true)} />
      </CardHeader>
      <Card className='-mt-10 pt-8'>
        <CardBody className="">
          <div>
            <table className="w-full min-w-[640px] table-auto mt-4">
              <thead>
                <tr className='text-[12px] font-semibold text-silver'>
                  <td>CATEGORY</td>
                  <td>DESCRIPTION</td>
                  <td>HANDLING OPTION</td>
                  <td>DEFAULT HANDLING</td>
                  <td>POSITION</td>
                  <td>ACTION</td>
                </tr>
              </thead>
              <tbody>
                {Pageloader && (
                  <tr>
                    <td colSpan="5">
                      <div className="flex justify-center items-center my-10">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                )}
                {
                  response.map((result, index) => {
                    return (
                      <tr key={index} className={`border-t text-black/90 font-semibold ${Pageloader && 'hidden'}`}>
                        <td className='py-5'>{result.name}</td>
                        <td className='py-5'>{result.description}</td>
                        <td className='py-5'>{result.is_foldable && result.is_hangable ? 'Hang - Fold' : result.is_hangable ? ' Hang' : result.is_foldable && 'Fold'}</td>
                        <td className='py-5'>{result.default_handling_option}</td>
                        <td className='py-5'>{result.position}</td>
                        <td role='button'>
                          <Link to={`/dashboard/category/${result.id}`} className=' mt-2 text-gray-600 py-2 px-4 fa-solid fa-arrow-right hover:bg-lightsilver rounded rounded-lg' ></Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          <p className={`${errorclass}`}>{fetcherror}</p>
        </CardBody>
      </Card>


      <Dialog open={is_addcategory} handler={() => setIs_addcategory(false)} size='md'>

        <div className="bg-white   p-4 py-10 px-10 rounded-lg ">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-500 p-3 hover:scale-90 transform transform-transition duration-100"
            onClick={() => setIs_addcategory(false)}
          >
            &times;
          </button>
          <h3 className="text-2xl text-gray-800 font-semibold mb-6 ">Category</h3>
          <div className='flex justify-between gap-3'>
            <label className='text-gray-900 ' >Name
              <input
                type="text"
                value={catname}
                placeholder="e.g T-Shirt"
                onChange={(e) => setCatName(e.target.value)}
                className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 placeholder:font-thin"
                required
              />
              <div className='text-red-600 text-[10px]'>{name_error}</div>
            </label>
            <label className='text-gray-900 ' >Position
              <input
                type="text"
                value={catposition}
                onChange={(e) => setCatPosition(e.target.value)}
                placeholder="e.g 1,2,3"
                className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 placeholder:font-thin "
                required
              />
              <div className='text-red-600 text-[10px]'>{position_error}</div>
            </label>
          </div>
          <label className='text-gray-900 ' >Desciption
            <input
              type="text"
              value={catdescription}
              onChange={(e) => setCatdescription(e.target.value)}
              placeholder="Description Here.."
              className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 placeholder:font-thin"
              required
            />
          </label>
          <div className='flex justify-between'>
            <div>
              Handling Options
              <div className='py-2 font-light'>
                <Switch
                  checked={is_foldable}
                  onClick={() => { setIs_foldable(!is_foldable) }}
                /> Fold
                <br />
                <Switch checked={is_hangable} onClick={() => { setIs_hangable(!is_hangable) }} /> Hang
              </div>
              <div className='text-red-600 text-[10px]'>{handlingerror}</div>
            </div>
            <div>
              Default Handling Option
              <div className='font-light'>
                <input type='radio' role='button' name='default' className='mt-2 ' value={'fold'} onChange={(e) => { setDefault_handling_option(e.target.value) }} /> Fold
                <br />
                <input
                  type='radio'
                  role='button'
                  name='default'
                  className='mt-2'
                  value={'hang'}
                  onChange={(e) => { setDefault_handling_option(e.target.value) }}
                />
                Hang
              </div>
              <div className='text-red-600 text-[10px]'>{default_handlingerror}</div>
            </div>
          </div>
          <div className='text-red-700'>{Formerror}</div>
          <div className='flex justify-end gap-4'>
            <button
              onClick={() => addcategory()}
              className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg  hover:scale-95 transform transform-transition duration-200"
            >
              Save
            </button>
          </div>
        </div>

      </Dialog>

    </>
  )
}

export default Category
