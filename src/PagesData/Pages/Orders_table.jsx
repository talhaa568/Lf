import { Delete_Order, Edit_Order } from '@/widgets/cards/Orders_edit_api';
import { Card, CardHeader, Dialog, Typography, Switch, Select, Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Orders_table({ pageid, pagedata, order_data }) {
  const [is_addOrder, setIs_AddOrder] = useState(false);
  const [categoryData, Set_CategoryData] = useState();
  const [items_data, SetItems_Data] = useState();
  const [category_id, Set_Category_id] = useState();
  const [cat_added, Set_Cat_added] = useState(false);
  const token = localStorage.getItem('authtoken');
  const [is_itemadded, setIs_itemAdded] = useState(false);
  const [items_name, setItems_name] = useState('');
  const [order_id, Set_Order_id] = useState();
  const [is_edit, SetIs_edit] = useState(false);
  const [is_delete, SetIs_Delete] = useState(false);
  const [loader, SetLoader] = useState(false);

  const [cleaning_method, setCleaning_method] = useState('');
  const [description, setDescription] = useState('');
  const [handling_option, setHandling_option] = useState('');
  const [is_open_item, setIs_open_item] = useState(false);
  const [item_id, setItem_id] = useState('');
  const [open_item_name, setOpen_item_name] = useState('');
  const [piece, setPiece] = useState();
  const [price_per_unit, setPrice_per_unit] = useState();
  const [quantity, setQuantity] = useState();

  const New_Order = async (categoryid) => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/items?category_id=${categoryid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
      const data = await response.json();
      if (data.success === true) {
        console.log('cat data', data)
        Set_Cat_added(true)
        SetItems_Data(data.result)
      }
    }
    catch (error) {
      console.log('error occur while fetching')
    }
  }
  const Add_Order = async () => {
    SetLoader(true)
    try {
      const bodyData = {
        description,
        cleaning_method,
        handling_option,
        quantity: Number(quantity),
        price_per_unit: parseFloat(price_per_unit),
        is_open_item,
        piece: Number(piece) || 1,
      };
      if (is_open_item) {
        bodyData.open_item_name = open_item_name;
      } else {
        bodyData.item_id = item_id;
      }
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/order-items/orders/${pageid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(bodyData),
      })
      const data = await response.json();
      if (data.success === true) {
        SetLoader(false)
        setIs_AddOrder(false)
        toast.success('Order Added Successfully')
        Set_Cat_added(false)
        setIs_itemAdded(false)
        order_data();
      }
    }
    catch (error) {
      console.log('error occur while fetching')
    }
  }
  const Set_CategoryID = async () => {
    try {
      const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/item-categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`
        }
      })
      const data = await response.json();
      if (data.success === true) {
        Set_CategoryData(data)
      }
    }
    catch (error) {
      console.log('error occur while fetching')
    }
  }
  useEffect(() => {
    if (is_addOrder) {
      Set_CategoryID();
    }
  }, [is_addOrder]);
  return (
    <>
      <CardHeader variant="gradient" color="gray" className="px-7 pt-6 pb-7 mt-8 z-20 flex justify-between ">
        <Typography variant="h6" color="white" className="mt-2">
          Order Items
        </Typography>
        <Typography
          role="button"
          onClick={() => {
            setIs_AddOrder(true)
            setPrice_per_unit()
            setQuantity()
          }
          }
          className="fa-solid fa-plus px-3 py-1 text-black bg-white rounded-lg"
        ></Typography>
      </CardHeader>
      <Card className="py-3 px-5 -mt-10">
        <table className="w-full table-auto mt-14">
          <thead>
            <tr className="text-[11px] text-silver font-semibold">
              <td>NAME</td>
              <td>QUANTITY</td>
              <td>CLEANING METHOD</td>
              <td>HANDLING OPTION</td>
              <td>UNIT PRICE</td>
              <td>TOTAL PRICE</td>
              <td>APPROVED</td>
              <td>OPEN ITEM</td>
              <td>ACTION</td>
            </tr>
          </thead>
          <tbody>
            {pagedata?.order_items?.map((items, idx) => (
              <tr key={idx} className="border-t text-black text-sm font-medium">
                <td className="py-4">{items.name || '-'}</td>
                <td className="py-4">{items.quantity || '-'}</td>
                <td className="py-4">{items.cleaning_method || '-'}</td>
                <td className="py-4">{items.handling_option || '-'}</td>
                <td className="py-4">{items.price_per_unit || '-'}</td>
                <td className="py-4">{items.total_price || '-'}</td>
                <td className="py-4">{items.is_approved ? 'Yes' : 'No'}</td>
                <td className="py-4">{items.is_open_item ? 'Yes' : 'No'}</td>
                <td>
                  <button className="text-[12px] font-semibold text-silver hover:bg-lightsilver px-4 py-2 rounded-lg hover:bg-opacity-30"
                    onClick={() => {
                      Set_Order_id(items.id)
                      SetIs_edit(true)
                      setQuantity(items.quantity)
                      setPrice_per_unit(items.price_per_unit)
                    }
                    }
                  >
                    EDIT
                  </button>
                  <button className="text-[12px] text-red-700 font-semibold hover:bg-red-100 rounded-lg px-4 py-2 hover:bg-opacity-30"
                    onClick={() => {
                      Set_Order_id(items.id)
                      SetIs_Delete(true)
                    }
                    }
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Dialog open={is_addOrder || is_edit} handler={() => {
        setIs_AddOrder(false)
        SetIs_edit(false)
      }} size="md" className=" p-4 sm:p-6 md:p-8  lg:p-10">
        <div>
          {is_edit ? (<div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 font-semibold">Standard Order</h3>
            <div className='flex justify-between gap-6 mt-4'>
              <div className='w-full'>
                <h4 className='text-gray-800  font-semibold'>Quantity </h4>
                <input
                  type="text"
                  placeholder="e.g 1,2..."

                  value={quantity || 1}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full py-3 border border-gray-500 px-2 rounded"
                />
              </div>
              <div className='w-full'>
                <h4 className='text-gray-800  font-semibold'>Price Per Unit </h4>
                <input
                  type="text"
                  placeholder="e.g. 10.75"

                  value={price_per_unit || 1}
                  onChange={(e) => setPrice_per_unit(e.target.value)}
                  className="w-full py-3 border border-gray-500 px-2 rounded"
                />
              </div>
            </div>
          </div>) : (<div>
            <div className="flex justify-between items-center gap-5 sm:gap-10 md:gap-15 lg:gap-20">
              <div className='flex justify-between mb-5 w-full'>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 font-semibold">Open Order</h3>
                <div>
                  <Switch checked={is_open_item} onChange={(e) => {
                    setIs_open_item(e.target.checked)
                    setItems_name
                  }} />
                  <span className='font-semibold text-gray-800 ml-1 text-base sm:text-lg md:text-xl lg:text-2xl'>Is Order Open</span>
                </div>
              </div>
            </div>
            {is_open_item ? (
              <div>
                <div className='flex justify-between gap-6 mt-4'>
                  <div className='w-full'>
                    <h4 className='text-gray-800  font-semibold'>Name </h4>
                    <input
                      type="text"
                      placeholder="Enter Name.."
                      value={open_item_name || ''}
                      onChange={(e) => setOpen_item_name(e.target.value)}
                      className="w-full py-3 border border-gray-500 px-2 rounded"
                    />
                  </div>
                  <div className='w-full'>
                    <h4 className='text-gray-800  font-semibold'>Piece </h4>
                    <input
                      type="text"
                      placeholder="e.g 1,2,3"
                      value={piece || ''}
                      onChange={(e) => setPiece(e.target.value)}
                      className="w-full py-3 border border-gray-500 px-2 rounded"
                    />
                  </div>
                </div>

                <div className='flex justify-between gap-6 mt-4'>
                  <div className='w-full'>
                    <h4 className='text-gray-800  font-semibold'>Cleaning Method </h4>
                    <select
                      className="w-full py-3 border border-gray-500 px-2 rounded font-light"
                      value={cleaning_method}
                      onChange={(e) => setCleaning_method(e.target.value)}
                    >
                      <option disabled hidden value="">Choose a cleaning method</option>
                      <option value="dry_clean">Dry Clean</option>
                      <option value="wash">Wash</option>
                    </select>
                  </div>
                  <div className='w-full'>
                    <h4 className='text-gray-800  font-semibold'>Handling Method </h4>
                    <select
                      className="w-full py-3 border border-gray-500 px-2 rounded font-light"
                      value={handling_option}
                      onChange={(e) => setHandling_option(e.target.value)}
                    >
                      <option disabled hidden value="">Choose a handling Option</option>
                      <option value="fold">Fold</option>
                      <option value="hang">Hang</option>
                    </select>
                  </div>

                </div>
                <div className='flex justify-between gap-6 mt-4'>
                  <div className='w-full'>
                    <h4 className='text-gray-800  font-semibold'>Quantity </h4>
                    <input
                      type="text"
                      placeholder="e.g 1,2..."
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full py-3 border border-gray-500 px-2 rounded"
                    />
                  </div>
                  <div className='w-full'>
                    <h4 className='text-gray-800  font-semibold'>Price Per Unit </h4>
                    <input
                      type="text"
                      placeholder="e.g. 10.75"
                      value={price_per_unit}
                      onChange={(e) => setPrice_per_unit(e.target.value)}
                      className="w-full py-3 border border-gray-500 px-2 rounded"
                    />
                  </div>
                </div>

              </div>
            ) : (
              <div>
                <div className='gap-6 justify-between flex'>
                  <div className='w-full'>
                    <h4 className='font-semibold text-gray-800'> Select Category To Order</h4>
                    <select className='border border-gray-500 rounded py-3 px-2 w-full' onChange={(e) => {
                      const id = e.target.value;
                      Set_Category_id(id);
                      New_Order(id);
                    }}>
                      <option disabled selected hidden>
                        Choose a category
                      </option>
                      {categoryData?.result?.map((result, index) => (
                        <option key={index} value={result.id}>
                          {result.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='w-full'>
                    {cat_added &&
                      <>
                        <h4 className='font-semibold text-gray-800'>Add items to Add</h4>
                        <select
                          className='border border-gray-500 rounded w-full py-3 px-2'
                          onChange={(e) => {
                            const selectedItem = items_data.find(item => item.name === e.target.value);
                            if (selectedItem) {
                              setIs_itemAdded(true);
                              setOpen_item_name(selectedItem.name);
                              setItem_id(selectedItem.id);
                            }
                          }}
                        >
                          <option disabled selected hidden>Choose an Item</option>
                          {items_data?.map((item, idx) => (
                            <option key={idx} value={item.name} >{item.name}</option>
                          ))}
                        </select>

                      </>
                    }
                  </div>
                </div>

                {is_itemadded &&

                  <div>
                    <h4 className='text-gray-800  font-semibold mt-4'>Selected Item Details: </h4>
                    <div className='flex justify-between gap-6 mt-4'>
                      <div className='w-full'>
                        <h4 className='text-gray-800  font-semibold'>Name </h4>
                        <input
                          type="text"
                          disabled
                          placeholder="Description Here..."
                          value={open_item_name}
                          className="w-full py-3 border border-gray-500 px-2 rounded"
                        />
                      </div>

                      <div className='w-full'>
                        <h4 className='text-gray-800  font-semibold'>Description </h4>
                        <input
                          type="text"
                          placeholder="Description Here..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full py-3 border border-gray-500 px-2 rounded"
                        />
                      </div>
                    </div>

                    <div className='flex justify-between gap-6 mt-4'>
                      <div className='w-full'>
                        <h4 className='text-gray-800  font-semibold'>Cleaning Method </h4>
                        <select
                          className="w-full py-3 border border-gray-500 px-2 rounded font-light"
                          value={cleaning_method}
                          onChange={(e) => setCleaning_method(e.target.value)}
                        >
                          <option disabled hidden value="">Choose a cleaning method</option>
                          <option value="dry_clean">Dry Clean</option>
                          <option value="wash">Wash</option>
                        </select>
                      </div>
                      <div className='w-full'>
                        <h4 className='text-gray-800  font-semibold'>Handling Method </h4>
                        <select
                          className="w-full py-3 border border-gray-500 px-2 rounded font-light"
                          value={handling_option}
                          onChange={(e) => setHandling_option(e.target.value)}
                        >
                          <option disabled hidden value="">Choose a handling Option</option>
                          <option value="fold">Fold</option>
                          <option value="hang">Hang</option>
                        </select>
                      </div>
                    </div>
                    <div className='flex justify-between gap-6 mt-4'>
                      <div className='w-full'>
                        <h4 className='text-gray-800  font-semibold'>Quantity </h4>
                        <input
                          type="text"
                          placeholder="e.g 1,2..."
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full py-3 border border-gray-500 px-2 rounded"
                        />
                      </div>
                      <div className='w-full'>
                        <h4 className='text-gray-800  font-semibold'>Price Per Unit </h4>
                        <input
                          type="text"
                          placeholder="e.g. 10.75"
                          value={price_per_unit}
                          onChange={(e) => setPrice_per_unit(e.target.value)}
                          className="w-full py-3 border border-gray-500 px-2 rounded"
                        />
                      </div>
                    </div>
                    <div className="text-red-700 mt-2"></div>
                  </div>
                }

              </div>)}
          </div>)}
          <div className="flex justify-end gap-4">
            <Button
              className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-6 py-4 rounded-lg"
              onClick={() => {
                if (is_edit) {
                  Edit_Order(order_id, quantity, price_per_unit, SetIs_edit, order_data, SetLoader);
                }
                else {
                  Add_Order()
                }
              }
              }
            >
              {loader ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={is_delete} handler={() => SetIs_Delete(false)}>
        <div className="bg-white rounded-lg p-4 py-7 ">
          <button
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:scale-90 transform transform-transition duration-100"
            onClick={() => SetIs_Delete(false)}
          >
            &times;
          </button>
          <h3 className="text-2xl text-gray-800 font-semibold mb-6">Delete Confirmation</h3>
          <p className='text-sm text-gray-600 font-normal mb-6'>Are You Sure You Want To Delete This Order?</p>
          <div className='flex justify-end gap-4'>
            <button
              className="hover:bg-red-100 text-red-600 mt-4 px-8 py-3 rounded rounded-lg font-semibold hover:scale-95 transform transform-transition duration-100"
              onClick={() => SetIs_Delete(false)}
            >
              Cancel
            </button>
            <button
              className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg hover:scale-95 transform transform-transition duration-200"
              onClick={() => { Delete_Order(order_id, order_data, SetIs_Delete, SetLoader) }}
            >
              {loader ? 'Deleting...' : 'CONFIRM'}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
export default Orders_table;
