import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import date from "date-and-time";
import { BsArrowRight } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const orderData = location.state;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded text-center">
        <div className="mb-6">
          <div className="flex justify-center text-9xl text-green-600 animate-pulse">
            <TiTick className="" />
          </div>
          <h2 className="text-3xl font-semibold text-green-600 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-700">
            Thank you for your order. Your order has been successfully placed.
          </p>
        </div>
        <div className="mb-8">
          <div className="py-3 ">
            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            {!Array.isArray(orderData) ? (
              <>
                <p>Order ID: {orderData.orderId}</p>
                <p>Order Total: {orderData.totalPrice}</p>
                <p>
                  <Link
                    to={`/dashboard/order-history/detail/${
                      orderData.orderId || orderData._id
                    }`}
                    className="flex items-center justify-center gap-2 text-sm py-2 text-blue-500 hover:underline"
                  >
                    View Details <BsArrowRight />
                  </Link>
                </p>
                <h1 className="text-lg font-semibold my-2">
                  Expected Delivery Date
                </h1>
                <p>
                  {date.format(new Date(orderData.deliveryDate), "MMM DD YYYY")}
                </p>
              </>
            ) : (
              <>
                {orderData && orderData.length > 0 && (
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Order Total</th>
                        <th className="px-4 py-2">Delivery Date</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData.map((order, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{order.orderId}</td>
                          <td className="px-4 py-2">{order.totalPrice}</td>
                          <td className="px-4 py-2">
                            {date.format(
                              new Date(order.deliveryDate),
                              "MMM DD YYYY"
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <Link
                              to={`/dashboard/order-history/detail/${order.orderId}`}
                              className="flex items-center justify-center gap-2 text-sm py-2 text-blue-500 hover:underline"
                            >
                              View Details <BsArrowRight />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
        <Link to="/" className="text-blue-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
