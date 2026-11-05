"use cache";
import "../css/static.css";
const Footer = async () => {
  const now = new Date();
  return (
    <footer>
      <p>Infinyte {now.getFullYear()}</p>
      <p>Smart electronics for modern living.</p>
      <p>All rights reserved.</p>
    </footer>
  );
};

export default Footer;
