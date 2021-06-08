import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { months } from "../../assets/months";
import styles from "./AmountDisplay.module.css";

const AmountDisplay = () => {
  const [amountData, setAmountData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    db.collection("cashregister")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) =>
        setAmountData(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  useEffect(() => {
    setTotalAmount(
      amountData.reduce((a, b) => {
        if (b.type === "credit") return a + b.amount;
        else return a - b.amount;
      }, 0)
    );
  }, [amountData]);

  return (
    <div className={styles.AmountDisplay}>
      <div className={styles.totalAmount}>
        <h1>Total Amount: ₹{totalAmount}</h1>
      </div>
      <div className={styles.amountCards}>
        {amountData.map((amt) => {
          const { id, amount, remark, time, type } = amt;
          const t = new Date(1970, 0, 1);
          t.setSeconds(time?.seconds);
          return (
            <div
              key={id}
              className={styles.singleAmountCard}
              style={{ color: type === "credit" ? "limegreen" : "red" }}
            >
              <div className={styles.remark}>
                <p>
                  {t.getDate()} {months[t.getMonth()]} {t.getFullYear()}
                </p>
                <p>{remark}</p>
              </div>
              <p>{type === "credit" ? `+ ₹${amount}` : `- ₹${amount}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmountDisplay;
