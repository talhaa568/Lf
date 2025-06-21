import {
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { Home, Area, Orders } from "@/pages/dashboard";
import Actionbtn from "./widgets/charts/Actionbtn";
import Category from "./pages/dashboard/Category";
import Categorydetails from "./widgets/charts/Categorydetails";
import User from "./pages/dashboard/User";
import Usersdetails from "./widgets/charts/Usersdetails";
import Orders_details from "./widgets/charts/Orders_details";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "area",
        path: "area",
        element: <Area />,
      },
       {
        icon: <TableCellsIcon {...icon} />,
        name:'category',
        id: 'category',
        path: "category",
        element:<Category/>
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name:'orders',
        id: 'orders',
        path: "admin/orders",
        element:<Orders/>
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name:'users',
        id: 'users',
        path: "admin/users",
        element:<User/>
      },
       {
        id: 'Ashtead',
        path: "area/:id",
        element:<Actionbtn/>
      },
      {
        id:'categorydetails',
        path:'category/:categoryid',
        element:<Categorydetails/>
      },
      {
        id:'userdetails',
        path:'admin/users/:userid',
        element:<Usersdetails/>
      },
       {
        id:'orderdetails',
        path:'admin/orders/:orderid',
        element:<Orders_details/>
      }
      
    ],
  },
  
];

export default routes;
