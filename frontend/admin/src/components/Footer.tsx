import "../css/static.css";
const Footer = () => {
  const now: Date = new Date();
  return (
    <footer>
      <p>&copy; Infinyte {now.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
