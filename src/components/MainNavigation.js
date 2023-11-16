import { Link } from "react-router-dom";
import styles from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <>
      <div className={styles.main}>
        <h3>React Foods!</h3>
        <Link to="/food">Foods</Link>
        <Link to="foodItems">Food Items</Link>
      </div>
    </>
  );
}
export default MainNavigation;
