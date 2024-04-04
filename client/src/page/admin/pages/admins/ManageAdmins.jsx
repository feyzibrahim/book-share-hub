import React, { useEffect, useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import BlockOrUnBlock from "./BlockOrUnBlock";
import Modal from "../../../../components/Modal";
import FilterArray from "../../Components/FilterArray";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../Components/ClearFilterButton";
import SearchBar from "../../../../components/SearchBar";
import Pagination from "../../../../components/Pagination";
import { getSellers } from "../../../../redux/actions/admin/customerAction";

const ManageAdmins = () => {
  const dispatch = useDispatch();

  const { customers, loading, error, totalAvailableCoupons } = useSelector(
    (state) => state.customers
  );

  // Filter variables
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter Handling Function
  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      if (type === "page") {
        setPage(1);
      }
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  // Removing filters
  const removeFilters = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("search");
    params.delete("page");
    params.delete("status");
    params.delete("startingDate");
    params.delete("endingDate");
    setSearch("");
    setStartingDate("");
    setEndingDate("");
    setSearchParams(params);
  };

  useEffect(() => {
    dispatch(getSellers(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  const [selectedOrderToUpdate, setSelectedOrderToUpdate] = useState({});
  const [blockUnBlockModal, setBlockUnBlockModal] = useState(false);
  const toggleBlockUnBlockModal = (data) => {
    setBlockUnBlockModal(!blockUnBlockModal);
    setSelectedOrderToUpdate(data);
  };

  return (
    <>
      {blockUnBlockModal && (
        <Modal
          tab={
            <BlockOrUnBlock
              toggleModal={toggleBlockUnBlockModal}
              data={selectedOrderToUpdate}
            />
          }
        />
      )}
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Sellers</h1>
            <div className="flex items-center gap-2 mt-2 mb-4 text-gray-500">
              <p className="text-blue-500 font-semibold">Dashboard</p>
              <span>
                <BsCaretRightFill />
              </span>
              <p className="font-semibold">Sellers List</p>
            </div>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "active", "blocked"]}
            handleClick={handleFilter}
          />
          <div className="flex my-2 gap-3">
            <RangeDatePicker
              handleFilter={handleFilter}
              startingDate={startingDate}
              setStartingDate={setStartingDate}
              endingDate={endingDate}
              setEndingDate={setEndingDate}
            />
            <ClearFilterButton handleClick={removeFilters} />
          </div>
        </div>
        <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
          {customers && (
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head">Name</th>
                  <th className="admin-table-head">Email</th>
                  <th className="admin-table-head">Phone No</th>
                  <th className="admin-table-head">Status</th>
                  <th className="admin-table-head">Joined</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((admin, index) => {
                  const isLast = index === customers.length - 1;

                  return (
                    <TableRow
                      isLast={isLast}
                      admin={admin}
                      key={index}
                      toggleBlockUnBlockModal={toggleBlockUnBlockModal}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="py-5">
          <Pagination
            handleClick={handleFilter}
            page={page}
            number={10}
            totalNumber={totalAvailableCoupons}
          />
        </div>
      </div>
    </>
  );
};

export default ManageAdmins;
