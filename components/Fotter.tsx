import { BsFillHouseFill, BsFillCartFill, BsPlusLg,BsPersonCircle, BsFillCreditCardFill} from "react-icons/bs";
export const Footer = () => {
  return (
    <div className="btm-nav footer">
      <a className="footer-items" href="/">
        <BsFillHouseFill className="footer-icons" />
        <span className="btm-nav-label">Home</span>
      </a>
      <a className="footer-items">
        <BsFillCartFill className="footer-icons"/>
        <span className="btm-nav-label">My Order</span>
      </a>
      <div className="footer-ordernow">
        <BsPlusLg className="footer-icons"/>
        <span className="btm-nav-label" style={{ fontSize: "10px" }}>Order<br /> Now</span>
      </div>
      <a className="mb-2">
       <BsFillCreditCardFill className="footer-icons"/>
        <span>Bill Info</span>
      </a>      
      <a className="mb-2">
      <BsPersonCircle className="footer-icons"/>
      <span>Profile</span></a>
    </div>
  )

}


