import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import date from "date-and-time";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const TableRow = ({ isLast, fest }) => {
  const classes = isLast ? "p-4" : "p-4 border-b border-gray-200 ";
  const navigate = useNavigate();

  return (
    <tr
      className={`${classes} hover:bg-gray-200 active:bg-gray-300 cursor-pointer`}
      onClick={() => navigate(`edit/${fest._id}`)}
    >
      <td className="admin-table-row flex items-center gap-2">
        <p className="line-clamp-1 w-52">{fest.name} </p>
      </td>
      <td className="admin-table-row">
        {fest.location.address}, {fest.location.city}, {fest.location.country}
      </td>
      <td className="admin-table-row">
        <div className="flex items-center gap-2">
          {fest.start_date
            ? date.format(new Date(fest.start_date), "DD MMM, YY")
            : "No Data"}
          {fest.end_date && <BsArrowRight />}
          {fest.end_date
            ? date.format(new Date(fest.end_date), "DD MMM, YY")
            : "No Data"}
        </div>
      </td>
      <td className="admin-table-row">{fest.organizer}</td>
      <td className="admin-table-row">
        {fest.createdAt
          ? date.format(new Date(fest.createdAt), "MMM DD YYYY")
          : "No Data"}
      </td>
      <td className="admin-table-row">
        <div className="flex items-center gap-2 text-lg">
          <span className="hover:text-gray-500">
            <AiOutlineEdit />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
