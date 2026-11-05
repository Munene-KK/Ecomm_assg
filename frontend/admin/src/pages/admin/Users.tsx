import NavBar from "../../components/admin/NavBar";
import { UseTitle } from "../../components/UseTitle";
import { useAdmin } from "../../context/adminInfoContext";
import { Navigate } from "react-router-dom";
import "../../css/users.css";
import { API } from "../../components/API";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserSlash } from "react-icons/fa6";
import { RiUserForbidFill } from "react-icons/ri";
import { RiUserFollowFill } from "react-icons/ri";
import NewAdmin from "./NewAdmin";
import toast from "react-hot-toast";
///api/admins/users
interface User {
  userID: string;
  active: string;
  role: string;
}
interface Admin {
  _id: string;
  fullname: string;
  role: string;
  email: string;
  status: boolean;
  activate: boolean;
}
const Users = () => {
  UseTitle("Users");
  const { admin } = useAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/admins/users");
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchAdmis = async () => {
      try {
        const response = await API.get("/admins/manange");
        setAdmins(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAdmis();
    fetchUsers();
  }, []);
  //suspend/delete admins
  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/admins/monitor/delete/${id}`);
      setAdmins((prev) => prev.filter((admin) => admin._id !== id));
      toast.success("Admin deleted");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete Admin");
    }
  };
  return (
    <main>
      {admin ? (
        <main>
          <NavBar />
          <section className="users-container">
            <div className="buyers">
              <h3>
                <FaUsers /> Users &nbsp; &nbsp; &nbsp; {users?.length}
              </h3>
              {users ? (
                users.map((user) => (
                  <div key={user.userID} className="buyer1">
                    <span>
                      userID: <strong>{user.userID}</strong>
                    </span>
                    <article>
                      <p>
                        Role: <strong>{user.role}</strong>
                      </p>
                      <p>
                        Staus:
                        <strong>{user.active ? "Active" : "Logged out"}</strong>
                      </p>
                    </article>
                  </div>
                ))
              ) : (
                <p>No users yet</p>
              )}
            </div>

            <NewAdmin />
            <div className="admin-conatiner">
              <h3>
                <GrUserAdmin />
                Admins &nbsp;&nbsp;&nbsp; {admins.length}
              </h3>
              {admins ? (
                admins.map((admin) =>
                  admin._id === "6adc5e22284486b57cde8d4c" ? (
                    <article key={admin._id} className="main-account">
                      <h4>Main Account</h4>
                      <p>
                        Name : <strong>{admin.fullname}</strong>
                      </p>
                      <p>
                        Role : <strong>{admin.role}</strong>
                      </p>
                    </article>
                  ) : (
                    <article key={admin._id} className="other-admins">
                      <p>
                        Name: <strong>{admin.fullname}</strong>
                      </p>
                      <p>
                        Email: <strong>{admin.email}</strong>
                      </p>
                      <p>
                        Role: <strong>{admin.role}</strong>
                      </p>
                      <p>
                        Status:
                        <strong>
                          {admin.status ? "Active" : "Logged out"}
                        </strong>
                      </p>
                      <p className="admin-actions">
                        <button className="active">
                          {admin.activate ? (
                            <span>
                              <RiUserForbidFill />
                              Suspend
                            </span>
                          ) : (
                            <span>
                              <RiUserFollowFill />
                              Activate
                            </span>
                          )}
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDelete(admin._id)}
                        >
                          <FaUserSlash /> Delete
                        </button>
                      </p>
                    </article>
                  ),
                )
              ) : (
                <p>No admins adde yet</p>
              )}
            </div>
          </section>
        </main>
      ) : (
        <Navigate to="/" replace />
      )}
    </main>
  );
};

export default Users;
