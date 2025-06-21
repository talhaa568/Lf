import {
  Card,
  CardBody,
  CardHeader,

  Spinner,

  Switch,

  Typography,

} from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export function Area() {
  const [table, SetTable] = useState([]);
  const [loader, setLoader] = useState(true)
  const [areaname, setAreaname] = useState(null)
  const [is_createarea, setIs_createarea] = useState(false)


  const [fetcherror, setFetcherror] = useState("")
  const [errorclass, setErrorclass] = useState('')


  const token = localStorage.getItem("authtoken")

  const tabledata = async () => {
    try {

      setLoader(true)
      setFetcherror(null)
      const response = await fetch("https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/areas", {
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
        setFetcherror(null)

        SetTable(data.result)
      }
      else {
        setLoader(false)
        setFetcherror(data.message)
        setErrorclass('text-red-600 text-center text-sm border-t -mt-3 pt-4')

      }

      console.log(data)
    }
    catch (error) {
      setLoader(true)

      setFetcherror("Failed To Fetch Data")
      setErrorclass('text-red-600 text-center text-sm border-t -mt-3 pt-4')
      setErrorclass('text-red-600 text-center text-sm border-t -mt-3 pt-4')

    }
  }


  const newArea = async () => {
    try {

      const response = await fetch("https://staging-laundry-free-cdd931a42c66.herokuapp.com/api/areas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
        body: JSON.stringify({ name: areaname })
      });

      const data = await response.json();
      console.log("POST response:", data); // helpful log

      if (data.success === true) {
        setLoader(false);
        setAreaname("");
        toast.success('New Area Created')
        setIs_createarea(false);

        await tabledata(); // ✅ this re-fetches the correct data array
      } else {
        setFetcherror("Failed to create area");
        setErrorclass('text-red-600 text-center text-sm -mt-6 pt-4');
      }

    } catch (error) {
      console.error("Error creating area:", error);
      setIs_createarea(false);
      setFetcherror("Something went wrong");
      setErrorclass('text-red-600 text-center text-sm -mt-6 pt-4');
    }
  };



  useEffect(() => {
    tabledata();
  }, []);






  return (
    <>

      <CardHeader variant="gradient" color="gray" className="p-6 mt-10 z-20 flex justify-between">
        <Typography variant="h6" color="white">
          Area
        </Typography>
        <Typography role="button" onClick={() => { setIs_createarea(true) }} className="bg-white text-black  hover:bg-lightsilver fa-solid fa-plus rounded rounded-lg px-4 py-1 text-lg">

        </Typography>
      </CardHeader>
      <Card className="mx-3 -mt-4 mb-6 lg:mx-4 border border-blue-gray-100  ">
        <CardBody className="p-10  ">

          <table className="w-full min-w-[640px] table-auto">
            <thead className="grid grid-cols-2 md:grid-cols-3  py-4 text-silver text-xs font-bold   " >


              <tr className="col-span-1 md:col-span-2">
                AREA
              </tr>
              <tr className="col-span-1 ">
                Action
              </tr>
            </thead>
            <tbody className="font-semibold text-black w-full ">

              {loader && (
                <div className=" flex items-center justify-center">
                  <Spinner />
                </div>
              )}
              <p className={`${errorclass}`}>{fetcherror}</p>

              {table.map((data, index) => (

                <tr key={index} className="border-t grid grid-cols-2 md:grid-cols-3">

                  <td className="py-3 col-span-1 md:col-span-2 text-xs sm:text-base">{data.name}</td>
                  <td ><Link to={`/dashboard/area/${data.id}`} className="fa-solid px-4 rounded rounded-lg py-2  hover:bg-lightsilver/70 fa-arrow-right col-span-1 mt-2 text-silver"></Link> </td>
                </tr>


              ))}


            </tbody>
          </table>
        </CardBody>

      </Card>
      {is_createarea &&
        <Card >

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[1000] transform transform-transition duration-300">
            <div className="bg-white rounded-lg  p-4 py-10 px-10 w-[100%] max-w-xl shadow-lg relative animate-fadeInScale">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 p-3 hover:scale-90 transform transform-transition duration-100"
                onClick={() => setIs_createarea(false)}
              >
                &times;
              </button>
              <h3 className="text-2xl text-gray-800 font-semibold mb-6">Area</h3>
              <label className='text-gray-900 font-semibold' >Name
                <input
                  type="text"
                  placeholder="e.g Manchester"
                  value={areaname}
                  onChange={(e) => setAreaname(e.target.value)}
                  className="w-full p-3  mt-3 border border-gray-400 rounded mb-4 font-normal"
                  required
                />
              </label>
              <div className='flex justify-end gap-4'>

                <button
                  onClick={() => newArea()}

                  className="bg-gradient-to-r font-semibold from-gray-900 to-gray-800 text-white mt-4 px-8 py-3 rounded rounded-lg  hover:scale-95 transform transform-transition duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

        </Card>
      }

    </>
  );
}

export default Area;
