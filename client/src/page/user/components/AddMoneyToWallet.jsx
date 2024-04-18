import { useEffect } from "react";
import axios from "axios";
import { URL } from "../../../Common/api";
import { config } from "../../../Common/configurations";

const AddMoneyToWallet = ({
  setWalletBalance,
  cautionDeposit,
  setCautionDeposit,
  initiateRazorPayPayment,
}) => {
  useEffect(() => {
    const fetchWalletBalance = async () => {
      const { data } = await axios.get(`${URL}/user/wallet-total`, config);

      setWalletBalance(data.balance);
    };
    fetchWalletBalance();
  }, [setWalletBalance]);

  return (
    <div className="mt-5">
      <p>Add Money to wallet</p>

      <div className="flex gap-5">
        <input
          type="number"
          placeholder="Enter amount"
          className="admin-input-no-m"
          defaultValue={cautionDeposit}
          onChange={(e) => setCautionDeposit(e.target.value)}
        />
        <button
          className="btn-blue-border-no-pad px-4 text-white flex items-center gap-1"
          onClick={initiateRazorPayPayment}
        >
          <div className="w-10 h-10">
            <img
              src="https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg"
              alt="Razor Pay Icon"
              className="w-full h-full object-contain"
            />
          </div>
          Add money to wallet
        </button>
      </div>
    </div>
  );
};

export default AddMoneyToWallet;
