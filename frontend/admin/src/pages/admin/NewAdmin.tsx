import { useState, type SubmitEvent } from "react";
import { RiAdminFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { API } from "../../components/API";
import toast from "react-hot-toast";
const NewAdmin = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState("");
  const [showPswd, setShowPswd] = useState<boolean>(false);

  const handleTogglePswd = () => {
    setShowPswd((prev) => !prev);
  };
  const canSave =
    Boolean(fullname) && Boolean(email) && Boolean(password) && Boolean(role);
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAdmin = { fullname, role, email, password };
    try {
      await API.post("/admins/manange/create", newAdmin);
      toast.success("Admin created!");
    } catch (err) {
      console.log(err);
    } finally {
      setFullname("");
      setEmail("");
      setPassword("");
      setRole("");
    }
  };
  return (
    <section className="admin-container">
      <form onSubmit={handleSubmit}>
        <h3>Add new Admin</h3>

        <article>
          <label>Fullname</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </article>

        <article>
          <label>Role</label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option></option>
            <option value="Administrator">Administrator</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
          </select>
        </article>

        <article>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </article>

        <article>
          <label>Password</label>
          <input
            type={showPswd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={handleTogglePswd} className="show-hide">
            {showPswd ? <BiSolidHide /> : <IoMdEye />}
          </span>
        </article>

        <button
          type="submit"
          disabled={!canSave}
          style={{ cursor: canSave ? "pointer" : "not-allowed" }}
        >
          <RiAdminFill /> Add Admin
        </button>
      </form>
    </section>
  );
};

export default NewAdmin;
