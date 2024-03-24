import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TableRow from "./TableRow";
import FilterArray from "../../Components/FilterArray";
import SearchBar from "../../../../components/SearchBar";
import Pagination from "../../../../components/Pagination";
import RangeDatePicker from "../../../../components/RangeDatePicker";
import ClearFilterButton from "../../Components/ClearFilterButton";
import BreadCrumbs from "../../Components/BreadCrumbs";
import { AiOutlinePlus } from "react-icons/ai";
import { getFests } from "../../../../redux/actions/admin/festsAction";

const FestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { fests, loading, error, totalAvailableFests } = useSelector(
    (state) => state.fests
  );

  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

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
    dispatch(getFests(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <>
      <div className="p-5 w-full overflow-y-auto text-sm">
        <SearchBar
          handleClick={handleFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="font-bold text-2xl">Fests</h1>
            <BreadCrumbs list={["Dashboard", "Fests List"]} />
          </div>
          <div className="flex gap-3">
            <button
              className="admin-button-fl bg-blue-700 text-white"
              onClick={() => navigate("create")}
            >
              <AiOutlinePlus />
              Create New Fests
            </button>
          </div>
        </div>
        <div className="lg:flex justify-between items-center font-semibold">
          <FilterArray
            list={["all", "active", "expired"]}
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
        <div className="overflow-x-scroll  bg-white rounded-lg">
          {fests && (
            <table className="w-full min-w-max table-auto">
              <thead className="font-normal">
                <tr className="border-b border-gray-200">
                  <th className="admin-table-head w-52">Name</th>
                  <th className="admin-table-head">Location</th>
                  <th className="admin-table-head">Date</th>
                  <th className="admin-table-head">Organizer</th>
                  <th className="admin-table-head">Created</th>
                  <th className="admin-table-head">Action</th>
                </tr>
              </thead>
              <tbody>
                {fests.map((fest, index) => {
                  const isLast = index === fests.length - 1;

                  return <TableRow isLast={isLast} fest={fest} key={index} />;
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
            totalNumber={totalAvailableFests}
          />
        </div>
      </div>
    </>
  );
};

export default FestsPage;
