import { useEffect, useState } from "react";
import { db, timeStamp } from "../../firebase/firebase";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import styles from "./AmountInput.module.css";

const getTimeFormat = () => {
  const now = new Date();
  return `${now.toLocaleTimeString().split(":")[0]}:${
    now.toLocaleTimeString().split(":")[1]
  } ${now.toLocaleTimeString().split(" ")[1]}`;
};

const AmountInput = () => {
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [type, setType] = useState("credit");
  const [error, setError] = useState("");
  const [time, setTime] = useState(getTimeFormat());
  const now = new Date();

  const addToCashRegister = (e) => {
    e.preventDefault();
    if (!amount || !remark) return setError("Please fill all the Fields!");
    if (isNaN(Number(amount))) return setError("Amount cannot be a String!");
    db.collection("cashregister").add({
      id: Date.now().toString(),
      amount: parseInt(amount),
      remark,
      type,
      time: timeStamp,
    });
    setAmount("");
    setRemark("");
    setError("");
  };

  useEffect(() => {
    const updateTime = setTimeout(() => {
      setTime(getTimeFormat());
    }, 60000);
    clearTimeout(updateTime, 60000);
  });

  return (
    <div className={styles.AmountInput}>
      <div className={styles.dateTime}>
        <p>
          <FaRegCalendarAlt />
          &nbsp;&nbsp;
          {now.toLocaleDateString()}
        </p>
        <p>
          <FaRegClock />
          &nbsp;&nbsp;{time}
        </p>
      </div>
      <form onSubmit={addToCashRegister} className={styles.inputForm}>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <select onChange={(e) => setType(e.target.value)}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        {error.length > 0 && (
          <p className={styles.error}>
            <BiErrorCircle />
            &nbsp;{error}
          </p>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AmountInput;
