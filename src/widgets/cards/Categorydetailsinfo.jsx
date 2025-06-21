import { Card, Switch, Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function Categorydetails_info({ category_info, pagedata,  }) {
  const params=useParams();
  const pageid=params.categoryid;
  const token = localStorage.getItem('authtoken')
  const navigate = useNavigate();
  const [is_edit, setIs_edit] = useState(false);
  const [is_delete, setIs_delete] = useState(false);

  const [edit_name, setEdit_name] = useState('');
  const [edit_position, setEdit_position] = useState('');
  const [edit_description, setEdit_description] = useState('');
  const [edit_foldable, setEdit_foldable] = useState(false);
  const [edit_hangable, setEdit_hangable] = useState(false);
  const [edit_default, setEdit_default] = useState('');

  useEffect(() => {
    if (pagedata) {
      setEdit_name(pagedata.name);
      setEdit_position(pagedata.position);
      setEdit_description(pagedata.description);
      setEdit_foldable(pagedata.is_foldable);
      setEdit_hangable(pagedata.is_hangable);
      setEdit_default(pagedata.default_handling_option);
    }
  }, [pagedata]);

  const category_edit = async (method) => {
    try {
      const config = {
        method: `${method}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        }
      };

      if (method === 'PUT') {
        config.body = JSON.stringify({
          name: edit_name,
          position: edit_position,
          description: edit_description,
          is_foldable: edit_foldable,
          is_hangable: edit_hangable,
          default_handling_option: edit_default,
        });
      }

      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/item-categories/${pageid}`, 
        config);
      const data = await response.json();

      if (data.success === true) {
        category_info();
        if (method === 'PUT') toast.success('Category Edited Successfully');
        else if (method === 'DELETE') toast.success('Category Deleted Successfully');
        setIs_delete(false);
        setIs_edit(false);
      }
      else if(method === 'DELETE'){
        toast.error('Error Occurs')
      }
    } catch (error) {
      console.error('Edit failed', error);
    }
  }

  return (
    <>
      <Card className='p-6'>
        <div className='flex justify-between '>
          <div >
            <Typography className='font-semibold text-black/80 '>Name:<span className='font-normal text-gray-700'> {pagedata?.name}</span> </Typography>
            <Typography className='font-semibold text-black/80 '>Category Id:<span className='font-normal text-gray-700'> {pagedata?.id}</span> </Typography>
            <Typography className='font-semibold text-black/80 '>Total items:<span className='font-normal text-gray-700'> {pagedata?.items?.length}</span> </Typography>
          </div>
          <div className='flex gap-1 text-xs font-semibold'>
            <div>
              <button className='text-silver hover:bg-lightsilver hover:bg-opacity-50 px-4 py-2 rounded-lg' onClick={() => setIs_edit(true)}>EDIT</button>
            </div>
            <div>
              <button className='text-red-700 hover:bg-red-100 hover:bg-opacity-50 px-4 py-2 rounded-lg' onClick={() => setIs_delete(true)}> DELETE</button>
            </div>
          </div>
        </div>
        <hr className='border-gray-300 my-4' />
        <div className='flex justify-center gap-4'>
          <Card className='p-5 w-full border'>
            <h1 className='text-black/80 font-semibold text-xl'>Information</h1>
            <p className='font-semibold text-black/80'>Position: <span className='font-normal text-black/60'>{pagedata.position}</span></p>
            <p className='font-semibold text-black/80'>Foldable: <span className='font-normal text-black/60'>{pagedata.is_foldable ? 'Yes' : 'No'}</span></p>
            <p className='font-semibold text-black/80'>Hangable: <span className='font-normal text-black/60'>{pagedata.is_hangable ? 'Yes' : 'No'}</span></p>
            <p className='font-semibold text-black/80'>Handling Option: <span className='font-normal text-black/60'>{pagedata.default_handling_option}</span></p>
          </Card>
          <Card className='p-5 w-full border'>
            <h1 className='text-black/80 font-semibold text-xl'>Description</h1>
            <p>{pagedata.description}</p>
          </Card>
        </div>
      </Card>

      {is_edit &&
        <Card>
          <div className='fixed bg-black/50 inset-0 backdrop-blur-sm z-[1000] transform transform-transition duration-300 flex justify-center items-center'>
            <div className="bg-white rounded-lg p-4 py-10 px-10 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-black p-3 hover:scale-90 transform transform-transition duration-100 "
                onClick={() => setIs_edit(false)}
              >&times;</button>
              <h1 className='text-2xl text-gray-900'>Category</h1>
              <div className='flex justify-between gap-3 text-gray-900 mt-5'>
                <label> Name
                  <input
                    value={edit_name || ''}
                    onChange={(e) => setEdit_name(e.target.value)}
                    className='border border-gray-500 rounded w-full py-2 px-2' placeholder='e.g T-Shirt'
                  />
                </label>
                <label>Position
                  <input
                    value={edit_position || ''}
                    onChange={(e) => setEdit_position(e.target.value)}
                    className='border border-gray-500 rounded w-full py-2 px-2' placeholder='e.g 0,1,2'
                  />
                </label>
              </div>
              <div className='mt-4'>
                <label className='text-gray-900 '>Description
                  <input
                    value={edit_description || ''}
                    onChange={(e) => setEdit_description(e.target.value)}
                    className='border border-gray-500 rounded w-full py-2 px-2 ' placeholder='Description Here...'
                  />
                </label>
              </div>
              <div className='flex justify-between'>
                <div className='text-gray-900 mt-4'>
                  <h3 >Handling options</h3>
                  <div className='font-light text-silver mt-2'>
                    <Switch checked={edit_foldable} onClick={() => setEdit_foldable(!edit_foldable)} /> Fold
                  </div>
                  <div className='font-light text-silver mt-1'>
                    <Switch checked={edit_hangable} onClick={() => setEdit_hangable(!edit_hangable)} /> Hang
                  </div>
                </div>
                <div className='text-gray-900 mt-4'>
                  <h3 >Default Handling option</h3>
                  <div className='font-light text-silver mt-2'>
                    <input type="radio" name='handling_option' checked={edit_default === 'fold'} value="fold" onChange={(e) => setEdit_default(e.target.value)} /> Fold
                  </div>
                  <div className='font-light text-silver mt-1'>
                    <input type="radio" name='handling_option' checked={edit_default === 'hang'} value="hang" onChange={(e) => setEdit_default(e.target.value)} /> Hang
                  </div>
                </div>
              </div>
              <div className='flex justify-end mt-8'>
                <button
                  onClick={() => category_edit('PUT')}
                  className='px-6 py-3 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white'>Save</button>
              </div>
            </div>
          </div>
        </Card>
      }

      {is_delete &&
        <Card>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300">
            <div className="bg-white rounded-lg p-4 py-7 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:scale-90 transform transform-transition duration-100"
                onClick={() => setIs_delete(false)}
              >
                &times;
              </button>
              <h3 className="text-2xl text-gray-800 font-semibold mb-6">Delete Confirmation</h3>
              <p className='text-sm text-gray-600 font-normal mb-6'>Are You Sure You Want To Delete This Category ({pagedata.name})?</p>
              <div className='flex justify-end gap-4'>
                <button
                  onClick={() => setIs_delete(false)}
                  className="hover:bg-red-100 text-red-600 mt-4 px-8 py-3 rounded rounded-lg font-semibold hover:scale-95 transform transform-transition duration-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => category_edit('DELETE')}
                  className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg hover:scale-95 transform transform-transition duration-200"
                >
      
                  CONFIRM</button>
              </div>
            </div>
          </div>
        </Card>
      }
    </>
  )
}

export default Categorydetails_info
