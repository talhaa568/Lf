import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardHeader,
  Spinner,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Orders() {
  const token = localStorage.getItem("authtoken");
  const [pageloader, setPageloader] = useState(false);
  const [searchvalue, setSearchvalue] = useState("");
  const [pagedata, setPagedata] = useState([]);
  const [checkfilter, setCheckfilter] = useState(false);
  const [data_availability, setData_availability] = useState("");
  const [is_orderascending, setIs_Orderascending] = useState(null)
  const [is_statusascending, setIs_Statusascending] = useState(null)
  const [is_createdascending, setIs_createdascending] = useState(null)
  const [is_pickup_ascend, setIs_pickup_ascend] = useState(null)
  const [is_dropoff_ascend, setIs_dropoff_ascend] = useState(null)
  const [sorting, setSorting] = useState('')
  const orders_data = async (search, pagefilter) => {
    try {
      setPageloader(true)
      const response = await fetch(
        `https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/admin/orders?${pagefilter}${search}${sorting}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success === true) {
        setPageloader(false)
        console.log(data);
        setPagedata(data.result);
        if (data.result?.data?.length === 0) {
          setData_availability("No Data");
        } else {
          setPageloader(false)
          setData_availability("");
        }
      }
    } catch (error) {
      setPageloader(false)
      console.error("Error fetching orders:", error);
    }
  };
  const search_order = () => {
    const search = (`search=${searchvalue}`);
    orders_data(search, '');
  }
  const orders_sorting = (ascending, sortBy) => {
    setSorting(`orderBy=${sortBy}&orderDirection=${ascending ? 'asc' : 'desc'}`)
    orders_data('', '', sorting);
  }
  useEffect(() => {
    orders_data();
  }, []);
  return (
    <>
      <CardHeader variant="gradient" color="gray" className="p-7 mt-8 z-20">
        <Typography variant="h6" color="white">
          Orders
        </Typography>
      </CardHeader>
      <Card className="px-5 py-10 -mt-10">
        <div className="flex gap-3 py-6">
          <div className="relative w-full max-w-sm">
            <span className="fa-solid fa-search absolute left-3 top-9 transform -translate-y-1/2 text-gray-500"></span>
            <input
              onChange={(e) => {
                setSearchvalue(e.target.value)
              }}
              value={searchvalue}
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 mt-4 rounded-lg shadow w-full focus:outline-none border"
            />
            <button
              onClick={() => {
                setSearchvalue('')
                orders_data();
              }} className="fa-solid fa-close absolute top-7 right-4" />
          </div>
          <div>
            <button className="bg-black text-white rounded-lg px-4 py-3 text-xs font-semibold mt-4"
              onClick={() => { search_order() }}
            >
              SEARCH
            </button>
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              className="shadow rounded-lg border outline-none w-56 py-2 ml-2 mt-4"
              onChange={(event) => {
                const value = event.target.value;
                if (value === "") {
                  const pagefilter = ('');
                  orders_data('', pagefilter)
                } else {
                  const pagefilter = (`status=${value}`);
                  orders_data('', pagefilter)
                }
                orders_data();
              }}
            >
              <option className="font-light" value="">
                All
              </option>
              <option className="font-light" value="created">
                Created
              </option>
              <option className="font-light" value="ready_for_pickup">
                Ready For Pick Up
              </option>
              <option className="font-light" value="out_for_pickup">
                Out for Pick Up
              </option>
              <option className="font-light" value="picked_up">
                Picked Up
              </option>
              <option className="font-light" value="pick_up_issue">
                Pick Up Issue
              </option>
              <option className="font-light" value="at_shop">
                At Shop
              </option>
              <option className="font-light" value="items_added">
                Items Added
              </option>
              <option className="font-light" value="awaiting_review">
                Awaiting Review
              </option>
              <option className="font-light" value="partially_approved">
                Partilly Approved
              </option>
              <option className="font-light" value="approved">
                Approved
              </option>
              <option className="font-light" value="payment_pending">
                Payment Pending
              </option>
              <option className="font-light" value="payment_failed">
                Payment Failed
              </option>
              <option className="font-light" value="payment_successful">
                Payment Successful
              </option>
              <option
                className="font-light"
                value="payment_requires_processing_action"
              >
                Payment Requires ProcessingAction
              </option>
              <option className="font-light" value="processing">
                Processing
              </option>
              <option className="font-light" value="ready_for_dropoff">
                Ready For Drop Off
              </option>
              <option className="font-light" value="out_for_delivery">
                Out for Delivery
              </option>
              <option className="font-light" value="delivery_issue">
                Delivery Issue
              </option>
              <option className="font-light" value="delivered">
                Delivered
              </option>
              <option className="font-light" value="cancelled">
                Cancelled
              </option>
            </select>
          </div>
        </div>
        <div>
          <table className="table-auto w-full text-left">
            <thead className="text-silver text-[11px] ">
              <tr>
                <th className="relative px-4 " role="button" onClick={() => {
                  orders_sorting(is_orderascending, 'number')
                  setIs_Orderascending(!is_orderascending)
                  setIs_Statusascending(null)
                  setIs_createdascending(null)
                  setIs_pickup_ascend(null)
                  setIs_dropoff_ascend(null)
                }}>
                  ORDER#
                  <span className={`fa-solid fa-arrow-down ${is_orderascending === true ? 'fa-arrow-down text-green-400' : is_orderascending === false && 'fa-arrow-up text-red-400'} text-black text-[10px] ml-1 mt-[2px] absolute text-silver`}></span>
                </th>
                <th className="relative px-4" role="button" onClick={() => {
                  orders_sorting(is_statusascending, 'status')
                  setIs_Statusascending(!is_statusascending)
                  setIs_Orderascending(null)
                  setIs_createdascending(null)
                  setIs_pickup_ascend(null)
                  setIs_dropoff_ascend(null)
                }}>
                  STATUS
                  <span className={`fa-solid fa-arrow-down ${is_statusascending === true ? 'fa-arrow-down text-green-400' : is_statusascending === false && 'fa-arrow-up text-red-400'} text-black text-[10px] ml-1 mt-[2px] absolute text-silver`}></span>
                </th>
                <th className="relative px-4" role="button" onClick={() => {
                  orders_sorting(is_createdascending, "created_at")
                  setIs_createdascending(!is_createdascending)
                  setIs_Orderascending(null)
                  setIs_Statusascending(null)
                  setIs_pickup_ascend(null)
                  setIs_dropoff_ascend(null)
                }}>
                  CREATED AT
                  <span className={`fa-solid fa-arrow-down ${is_createdascending === true ? 'fa-arrow-down text-green-400' : is_createdascending === false && 'fa-arrow-up text-red-400'} text-black text-[10px] ml-1 mt-[2px] absolute text-silver `}></span>
                </th>
                <th className="relative px-4">NOTE</th>
                <th className="relative px-4">USER</th>
                <th className="relative px-4" role="button" onClick={() => {
                  orders_sorting(is_pickup_ascend, "created_at")
                  setIs_pickup_ascend(!is_pickup_ascend)
                  setIs_Orderascending(null)
                  setIs_Statusascending(null)
                  setIs_createdascending(null)
                  setIs_dropoff_ascend(null)
                }}>
                  PICKUP
                  <span className={`fa-solid fa-arrow-down ${is_pickup_ascend === true ? 'fa-arrow-down text-green-400' : is_pickup_ascend === false && 'fa-arrow-up text-red-400'} text-black text-[10px] ml-1 mt-[2px] absolute text-silver `}></span>
                </th>
                <th className="relative px-4" role="button" onClick={() => {
                  orders_sorting(is_dropoff_ascend, "created_at")
                  setIs_dropoff_ascend(!is_dropoff_ascend)
                  setIs_Orderascending(null)
                  setIs_Statusascending(null)
                  setIs_createdascending(null)
                  setIs_pickup_ascend(null)
                }}>
                  DROPOFF
                  <span className={`fa-solid fa-arrow-down ${is_dropoff_ascend === true ? 'fa-arrow-down text-green-400' : is_dropoff_ascend === false && 'fa-arrow-up text-red-400'} text-black text-[10px] ml-1 mt-[2px] absolute text-silver`}></span>
                </th>
                <th className="relative px-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {pagedata?.data?.map((data, index) => (
                <tr key={index} className="border-t">
                  <td className="py-5 px-4">{data.number || "-"}</td>
                  <td className="px-4">{data.status || "-"}</td>
                  <td className="px-4">{data.created_at || "-"}</td>
                  <td className="px-4">{data.note || "-"}</td>
                  <td className="px-4">
                    {data.user?.full_name || "-"}
                    <br />
                    {data.user?.email}
                  </td>
                  <td className="px-4">
                    {data.pickup?.date || "-"}
                    <p>{data.pickup?.time}</p>
                  </td>
                  <td className="px-4">
                    {data.dropoff?.date || "-"}
                    <p>{data.dropoff?.time || "-"}</p>
                  </td>
                  <td className="px-4">
                    <Link to={`/dashboard/admin/orders/${data.id} `} className="fa-solid fa-arrow-right text-silver hover:bg-lightsilver px-4 py-2 rounded-lg" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageloader ? (
            <div className="w-full" >
              <div c className="text-center flex justify-center w-full border-t pt-6">
                <div>
                  <Spinner />
                </div>
              </div>
            </div>
          ) : data_availability && (
            <div className="" >
              <div className="flex  justify-center  font-light py-4 w-full text-silver  border-t mt-4">
                <div className=""> {data_availability}</div>

              </div>
            </div>
          )
          }
        </div>
      </Card>
    </>
  );
}
export default Orders;
