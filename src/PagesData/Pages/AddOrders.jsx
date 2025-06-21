import { Button } from '@material-tailwind/react'
import React from 'react'

function AddOrders({ is_addOrder, setIs_AddOrder }) {
  return (
    <>
      {
        is_addOrder &&
        <Card>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300 ">
            <div className="bg-white rounded-lg  p-4 py-10 px-10 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 p-3 hover:scale-90 transform transform-transition duration-100"
                onClick={() => setIs_AddOrder(false)}
              >
                &times;
              </button>
              <h3 className="text-2xl text-gray-800 font-semibold mb-6 ">Category</h3>
              <div className='flex justify-between gap-3'>
                <label className='text-gray-900 ' >Name
                  <input
                    type="text"

                    placeholder="e.g T-Shirt"

                    className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 placeholder:font-thin"
                    required
                  />
                  <div className='text-red-600 text-[10px]'></div>
                </label>
                <label className='text-gray-900 ' >Position
                  <input
                    type="text"

                    placeholder="e.g 1,2,3"
                    className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 placeholder:font-thin "
                    required
                  />
                  <div className='text-red-600 text-[10px]'></div>
                </label>
              </div>
              <label className='text-gray-900 ' >Desciption
                <input
                  type="text"
                  placeholder="Description Here.."
                  className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 placeholder:font-thin"
                  required
                />
              </label>
              <div className='flex justify-between'>
              </div>
              <div className='text-red-700'></div>
              <div className='flex justify-end gap-4'>
                <Button
                  className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg  hover:scale-95 transform transform-transition duration-200"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Card>
      }
    </>
  )
}

export default AddOrders
