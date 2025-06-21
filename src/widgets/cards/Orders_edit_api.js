import { toast } from "react-toastify";
const token=localStorage.getItem('authtoken')
  
export const Edit_Order = async (order_id,quantity,price_per_unit,set_is_edit,order_data,SetLoader) => {
  try {
        SetLoader(true)
    const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/order-items/${order_id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: Number(quantity),
        price_per_unit: parseFloat(price_per_unit),
      }),
    });
    const data = await response.json();
    if (data.success === true) {
          SetLoader(false)
set_is_edit(false)
order_data();
    toast.success('Order Edited Successfully')
    }
    else{
      toast.error('Enter Correct Information')
    }
  } catch (error) {
   toast.error('Error Occur while editing order')
  }
};

export const Delete_Order = async (order_id,order_data,SetIs_Delete,SetLoader) => {
  try {
     SetLoader(true)
    const response = await fetch(`https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/order-items/${order_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success === true) {
       SetLoader(false)
      SetIs_Delete(false)
      order_data();
      toast.success('Item deleted successfully');
    }
  } catch (error) {
    toast.error('Error occurred while deleting order item');
  }
};
