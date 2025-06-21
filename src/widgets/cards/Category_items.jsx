import { Transition } from '@headlessui/react';
import { Card, CardHeader, Dialog, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function Category_items({ category_info, pagedata }) {
  const params = useParams();
  const pageid = params.categoryid;
  const [piece, setPiece] = useState();
  const [default_cleaning_method, setDefault_cleaning_method] = useState('');
  const [dry_cleaning, setDry_cleaning] = useState();
  const [washing, setWashing] = useState();
  const [type, setType] = useState('none');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [is_add, setIs_Add] = useState(false);
  const [item_id, setItem_id] = useState();
  const [is_delete, setIs_delete] = useState();
  const [is_edit, setIs_edit] = useState(false);

  const token = localStorage.getItem('authtoken')

  const Add_items = async (method) => {
    try {
      const response = await fetch('https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/items', {
        method: `POST`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          category_id: pageid,
          piece: Number(piece),
          default_cleaning_method,
          price: {
            dry_cleaning: Number(dry_cleaning),
            washing: Number(washing),
            type,
          },
          description,
          name,
        })
      }
      );
      const data = await response.json();
      if (data.success === true) {
        setIs_Add(false)
        category_info();
        toast.success('Item Added Successfully')
      }
      console.log(data)
    }
    catch (error) {
      console.log('Error While Fetching')
    }
  }
  const loadItemData = (item) => {
    setItem_id(item.id);
    setName(item.name || '');
    setPiece(item.piece || 0);
    setDescription(item.description || '');
    setDry_cleaning(item.price?.dry_cleaning || 0);
    setWashing(item.price?.washing || 0);
    setType(item.price?.type || 'none');
    setDefault_cleaning_method(item.default_cleaning_method || '');
    setIs_edit(true);
  };
  const items_action = async (method) => {
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
        category_id: pageid,
        piece: Number(piece),
        default_cleaning_method,
        price: {
          dry_cleaning: Number(dry_cleaning),
          washing: Number(washing),
          type,
        },
        description,
        name,
      })
    }
    const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/items/${item_id}`, config);
    const data = await response.json();
    if (data.success === true) {
      setIs_delete(false)
      setIs_edit(false)
      category_info();
      if (method === 'PUT') {
        toast.success('Item Edited Successfully')
      }
      else if (method === 'DELETE') {
        toast.success('Item Deleted Successfully')
      }
    }
  }
  return (
    <>
      <CardHeader variant="gradient" color="gray" className="px-7 py-6  mt-8 z-20 flex justify-between ">
        <Typography variant="h6" color="white" className='mt-2'>
          {pagedata.name} Items
        </Typography>
        <Typography role='button' className='fa-solid fa-plus px-4 py-2 text-black bg-white rounded-lg ' onClick={() => setIs_Add(true)}></Typography>
      </CardHeader>
      <Card className='py-3 px-5 -mt-10 ' >
        <table className="w-full  table-auto mt-14">
          <tr className='text-[11px] text-silver font-semibold '>
            <td>CATEGORY</td>
            <td>DESCRIPTION</td>
            <td>DRY CLEANING PRICE</td>
            <td>WASHING PRICE</td>
            <td>DEFAULT CLEANING METHOD</td>
            <td>TYPE</td>
            <td>PIECE</td>
            <td>ACTION</td>
          </tr>
          {pagedata?.items?.map((items, idx) => (
            <tr key={idx} className=' border-t text-black '>
              <td className='py-4'>{items.name}</td>
              <td className='py-4'>{items.description ? `${items.description}` : '-'}</td>
              <td className='py-4'>{items.price.dry_cleaning ? `${items.price.dry_cleaning}` : '-'}</td>
              <td className='py-4'>{items.price.washing ? `${items.price.washing}` : '-'}</td>
              <td className='py-4'>{items.default_cleaning_method ? `${items.default_cleaning_method}` : '-'}</td>
              <td className='py-4'>{items.price.type ? `${items.price.type}` : '-'}</td>
              <td className='py-4'>{items.piece ? `${items.piece}` : '-'}</td>
              <td >
                <button className='text-[12px] font-semibold text-silver hover:bg-lightsilver px-4 py-2 rounded-lg' onClick={() => {
                  setItem_id(items.id)
                  setIs_edit(true)
                  loadItemData(items)
                }}>EDIT</button>
                <button className='text-[12px]  text-red-700 font-semibold hover:bg-lightsilver rounded-lg px-4 py-2  ' onClick={() => {
                  setIs_delete(true)
                  setItem_id(items.id)
                }}>DELETE</button> </td>
            </tr>
          )
          )}
        </table>
      </Card>
      <Transition
        show={is_add}
        enter='transition ease-out duration-300'
        enterFrom='-translate-y-10 opacity-100'
        enterTo='translate-y-0 opacity-100'
        leave='transition ease-in duration-200'
        leaveFrom='translate-y-0 opacity-100'
        leaveTo='-translate-y-0 opacity-0'
      >
        <div className={`${is_add && 'backdrop-blur-sm h-[100%] fixed inset-0 justify-center items-center flex z-[1000] duration-400  bg-black/50'} `}>
          <div className='bg-white rounded-lg p-10 py-7 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale '>
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:scale-90 transform transform-transition duration-100 p-2"
              onClick={() => setIs_Add(false)}
            >
              &times;
            </button>
            <div className='text-gray-900'>
              <h1 className='text-2xl font-semibold'>Item</h1>
              <p className=' opacity-50 mb-10'> Save After Adding Items</p>
            </div>
            <div className='flex justify-between gap-3 '>
              <label className='text-gray-900 '>Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='border border-gray-500 rounded w-full py-2 px-2 font-thin' placeholder='e.g Shirt'
                />
              </label>
              <label className='text-gray-900 '>Piece
                <input
                  value={piece}
                  onChange={(event) => setPiece(Number(event.target.value))}
                  type='number'
                  className='border border-gray-500 rounded w-full py-2 px-2 font-thin' placeholder='e.g 1,2,3'
                />
              </label>
            </div>
            <div className='flex justify-between gap-3 mt-4 '>

              <label className='text-gray-900 w-full'>Description
                <input
                  value={description}
                  onChange={(event) => { setDescription(event.target.value) }}
                  type='text'
                  className='border border-gray-500 rounded w-full py-2 px-2 font-thin' placeholder='Description Here...'
                />
              </label>
              <div className='w-full'>
                <p className='text-gray-900 '>Type
                  <select
                    onChange={(event) => { setType(event.target.value) }}
                    className='border border-gray-500 rounded w-full px-2 py-2 font-thin '
                  >
                    <option value="" className='font-thin'>None</option>
                    <option value="fixed" className='font-thin'>Fixed</option>
                  </select>
                </p>
              </div>
            </div>
            <div className='flex justify-between gap-3 mt-3'>
              <label className='text-gray-900 w-full '>Washing Price
                <input
                  value={washing||''}
                  onChange={(event) => { setWashing(Number(event.target.value)) }}
                  type='number'
                  className='border border-gray-500 rounded w-full py-2 px-2 placeholder:font-thin' placeholder='e.g 12.1'
                />
              </label>
              <label className='text-gray-900 w-full'>Dry Cleaning Price
                <input
                  value={dry_cleaning||''}
                  onChange={(event) => { setDry_cleaning(Number(event.target.value)) }}
                  type='number'
                  className='border border-gray-500 rounded w-full py-2 px-2 placeholder:font-thin' placeholder='eg. 10.2'
                />
              </label>
            </div>
            <div className='text-gray-900 mt-4'>
              <h3 >Default Washing Method</h3>
              <div className='font-light text-silver mt-2' >
                <input value='wash' type="radio" name='handling_option'
                  onChange={(event) => setDefault_cleaning_method(event.target.value)}
                /> Wash
              </div>
              <div className='font-light text-silver mt-1'>
                <input value='dry_clean' type="radio" name='handling_option'
                  onChange={(event) => setDefault_cleaning_method(event.target.value)}
                /> Dry Clean
              </div>
            </div>
            <div className='flex justify-end mt-8'>
              <button

                className='px-6 py-3 rounded-lg bg-gray-900 text-white' onClick={() => Add_items()}>Save</button>
            </div>
          </div>
        </div>
      </Transition>
      <Dialog open={is_delete} handler={() => setIs_delete(false)} size='md' >

        <div className="bg-white rounded-lg p-4 py-7  ">
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
              onClick={() => items_action('DELETE')}
              className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg hover:scale-95 transform transform-transition duration-200"
            >CONFIRM</button>
          </div>
        </div>
      </Dialog>
      <Transition
        show={is_edit}
        enter='transition ease-out duration-300'
        enterFrom='-translate-y-10 opacity-100'
        enterTo='translate-y-0 opacity-100'
        leave='transition ease-in duration-200'
        leaveFrom='translate-y-0 opacity-100'
        leaveTo='-translate-y-0 opacity-0'
      >
        <div className={`${is_edit && 'backdrop-blur-sm h-[100%] fixed inset-0 justify-center items-center flex z-[1000] duration-400  bg-black/50'} `}>
          <div className='bg-white rounded-lg p-10 py-7 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale '>
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:scale-90 transform transform-transition duration-100 p-2"
              onClick={() => setIs_edit(false)}
            >
              &times;
            </button>
            <div className='text-gray-900'>
              <h1 className='text-2xl font-semibold'>Item</h1>
              <p className=' opacity-50 mb-10'> Save After Adding Items</p>
            </div>
            <div className='flex justify-between gap-3 '>
              <label className='text-gray-900 '>Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='border border-gray-500 rounded w-full py-2 px-2 font-thin' placeholder='e.g Shirt'
                />
              </label>
              <label className='text-gray-900 '>Piece
                <input
                  value={piece}
                  onChange={(event) => setPiece(Number(event.target.value))}
                  type='number'
                  className='border border-gray-500 rounded w-full py-2 px-2 font-thin' placeholder='e.g 1,2,3'
                />
              </label>
            </div>
            <div className='flex justify-between gap-3 mt-4 '>

              <label className='text-gray-900 w-full'>Description
                <input
                  value={description}
                  onChange={(event) => { setDescription(event.target.value) }}
                  type='text'
                  className='border border-gray-500 rounded w-full py-2 px-2 font-thin' placeholder='Description Here...'
                />
              </label>
              <div className='w-full'>
                <p className='text-gray-900 '>Type
                  <select
                    onChange={(event) => { setType(event.target.value) }}
                    className='border border-gray-500 rounded w-full px-2 py-2 font-thin '
                  >
                    <option value="" className='font-thin'>None</option>
                    <option value="fixed" className='font-thin'>Fixed</option>
                  </select>
                </p>
              </div>
            </div>
            <div className='flex justify-between gap-3 mt-3'>
              <label className='text-gray-900 w-full '>Washing Price
                <input
                  value={washing}
                  onChange={(event) => { setWashing(Number(event.target.value)) }}
                  type='number'
                  className='border border-gray-500 rounded w-full py-2 px-2 placeholder:font-thin' placeholder='e.g 12.1'
                />
              </label>

              <label className='text-gray-900 w-full'>Dry Cleaning Price
                <input
                  value={dry_cleaning}
                  onChange={(event) => { setDry_cleaning(Number(event.target.value)) }}
                  type='number'
                  className='border border-gray-500 rounded w-full py-2 px-2 placeholder:font-thin' placeholder='eg. 10.2'
                />
              </label>
            </div>
            <div className='text-gray-900 mt-4'>
              <h3 >Default Washing Method</h3>
              <div className='font-light text-silver mt-2' >
                <input value='wash' type="radio" name='handling_option'
                  onChange={(event) => setDefault_cleaning_method(event.target.value)}
                /> Wash
              </div>
              <div className='font-light text-silver mt-1'>
                <input value='dry_clean' type="radio" name='handling_option'
                  onChange={(event) => setDefault_cleaning_method(event.target.value)}
                /> Dry Clean
              </div>
            </div>
            <div className='flex justify-end mt-8'>
              <button
                className='px-6 py-3 rounded-lg bg-gray-900 text-white' onClick={() => items_action('PUT')}>Save</button>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
export default Category_items
