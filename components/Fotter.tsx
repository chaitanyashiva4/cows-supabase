import { BsFillHouseFill, BsFillCartFill, BsPlusLg,BsPersonCircle, BsFillCreditCardFill} from "react-icons/bs";
export const Footer = () => {
  return (
    <div className="btm-nav footer">
      <a className="footer-items" href="/">
        <BsFillHouseFill className="footer-icons" />
        <span className="btm-nav-label">POC Home</span>
      </a>
      <a className="footer-items">
        <BsFillCartFill className="footer-icons"/>
        <span className="btm-nav-label">My Order</span>
      </a>
      <div className="footer-ordernow">
        <BsPlusLg className="footer-icons"/>
        <span className="btm-nav-label" style={{ fontSize: "10px" }}>Order<br /> Now</span>
      </div>
      <a className="footer-items">
       <BsFillCreditCardFill className="footer-icons"/>
        <span className="btm-nav-label">Manage Orders</span>
      </a>      
      <a className="footer-items">
      <BsPersonCircle className="footer-icons"/>
      <span className="btm-nav-label">My Profile</span></a>
    </div>
  )

}


