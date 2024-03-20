import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { URL } from "../Common/api";
import { config } from "../Common/configurations";

const FilterUserDashboard = ({
  filters,
  price,
  handleClick,
  clearFilters,
  productType,
}) => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const { data } = await axios.get(`${URL}/user/categories`, config);
    setCategories(data.categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="lg:w-1/5">
      <ul className="hidden lg:block">
        <li className="uppercase">Type</li>
        <li className="category-li">
          <input
            type="radio"
            name="productType"
            value=""
            checked={productType === ""}
            onChange={(e) => handleClick("productType", e.target.value)}
          />{" "}
          All
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="productType"
            value="sell"
            checked={productType === "sell"}
            onChange={(e) => handleClick("productType", e.target.value)}
          />{" "}
          Buy
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="productType"
            value="rent"
            checked={productType === "rent"}
            onChange={(e) => handleClick("productType", e.target.value)}
          />{" "}
          Rent
        </li>
        <li className="uppercase">Category</li>
        {categories.map((item) => {
          return (
            <li className="category-li" key={item._id}>
              <input
                type="checkbox"
                name="category"
                value={item._id}
                checked={filters.includes(item._id)}
                onChange={(e) => handleClick("category", e.target.value)}
              />{" "}
              {item.name}
            </li>
          );
        })}

        <li className="uppercase">Price Range</li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value=""
            checked={price === ""}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          All Price
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="Under 250"
            checked={price === "Under 250"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Under 250₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="250-500"
            checked={price === "250-500"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          250₹ - 500₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="500-1000"
            checked={price === "500-1000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          500₹ - 1000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="1000-1500"
            checked={price === "1000-1500"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          1000₹ - 1500₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="2000-3000"
            checked={price === "2000-3000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          2000₹ - 3000₹
        </li>
        <li className="category-li">
          <input
            type="radio"
            name="priceRange"
            value="Above 3000"
            checked={price === "Above 3000"}
            onChange={(e) => handleClick("price", e.target.value)}
          />{" "}
          Above 3000₹{" "}
        </li>
        <li>
          <button
            onClick={clearFilters}
            className=" bg-blue-100 hover:bg-red-200 active:bg-red-300 outline-none px-5 py-2 rounded font-semibold flex items-center gap-2"
          >
            <BiTrash />
            <p className="text-xs">Clear All filters</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FilterUserDashboard;
