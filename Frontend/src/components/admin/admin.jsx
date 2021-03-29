import Navbar from "../navbar/navbar";
import { useEffect, useState } from "react";
import "../admin/admin.css";
import Sidenav from "../navbar/Sidenav";
import Modal from "react-modal";
import Editmodal from "./Editmodal";
import Deletemodal from "./Deletemodal";
import ReactToExcel from "react-html-table-to-excel";
import Pagination from './pagination';


Modal.setAppElement("#root");

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [render, setRender] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [id,setId] = useState(null);
  const [pass,setPass] = useState(null);
  const [hide,setHide] = useState(true);
  const [show,setShow] = useState(false);
  const [name,setName] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => { setCurrentPage(pageNumber);};
  useEffect(() => {
    const getAdmins = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/admins", {
        method: "GET",
      });
      const data = await response.json();
      setAdmins((prevState) => {
        return [...data];
      });
    };

    getAdmins();
  }, [status, render]);

  useEffect(() => {
    setFilteredData(
      admins.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, admins]);

  const handleClick = async (e) => {
    e.preventDefault();
    const request = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    const response = await request.json();
    setUsername("");
    setPassword("");
    console.log(response);
    setStatus(response.status);
    setRender(!render);
  };

  // const handleDelete = async (e, id) => {
  //   e.preventDefault();
  //   const request = await fetch(`http://127.0.0.1:8000/api/admins/${id}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       id: id,
  //     }),
  //   });
  //   const response = await request;
  //   const filteredAdmins = admins.filter((admin) => admins.id !== id);
  //   console.log(filteredAdmins);
  //   setAdmins((prevState) => {
  //     return [...filteredAdmins];
  //   });
  //   setRender((prevState) => {
  //     return !prevState;
  //   });
  // };

  // const handleEdit = async (e, id) => {
  //   e.preventDefault();
  //   console.log(newUsername, newPassword);
  //   const request = await fetch(`http://127.0.0.1:8000/api/admins/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: id,
  //       password: newPassword,
  //       name: newUsername,
  //     }),
  //   });
  //   const response = await request.json();
  //   console.log(response);
  //   setStatus(response.msg);
  //   setRender(!render);
  // };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <Navbar />
      <Sidenav />
      <button className="md" onClick={() => setModalIsOpen(true)}>
        <i class="fas fa-user-plus"></i>&nbsp;&nbsp;ADD AN ADMIN
      </button>
      <Modal
        className="mod"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="mdd">
          <div className="status">{status}</div>
          <br></br>
          <input
            className="admin-username"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              setStatus("");
            }}
            value={username}
          />
          <br />
          <input
            className="admin-password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <br />
          <button
            className="admin-submit"
            type="submit"
            value="ADD"
            onClick={(e) => handleClick(e)}
          >
            <i class="fas fa-user-plus"></i>
          </button>
        </div>
        <div>
          <button className="close" onClick={() => setModalIsOpen(false)}>
            Close
          </button>
        </div>
      </Modal>

      <div className="red-div"></div>
      <div className="App">
        <h1>ADMINS</h1>

        <input
          value={search}
          placeholder="Find Admins..."
          type="text"
          name=""
          placeholder="Search for..."
          className="searchfield"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> <br />
        <ReactToExcel
        className="excel-ta"
        table="table-to-xls"
        filename="excelFile"
        sheet="sheet 1"
        buttonText="Export Data" />
        <div className={hide ? `mod-edit hide-edit` : `mod-edit shown-edit`}>
          <Editmodal id={id} pass={pass} setPass={setPass} setHide={setHide}
          setRender={setRender}
          render = {render}
          />
          </div>
          <div className={ show ? `mod-edit shown-edit` : `mod-edit hide-edit`}>
          <Deletemodal id={id} setRender={setRender} render = {render} name={name}
          setShow={setShow} 
          />
        </div>
        <br></br>
        {currentPosts.length === 0 ? (
          <div style={{ textAlign: "center", color: "red" }}>
            No result found!
          </div>
        ) : (
          <table className="table" id="table-to-xls">
            
            <tbody>
              <tr>
                <th>ADMIN ID</th>
                <th>USERNAME</th>
                <th>ACTIONS</th>
                <th>ACTIONS</th>
              </tr>
              {currentPosts.map((admin, i) => {
                return (
                  <tr key={admin.id}>
                    <td>{i + 1}</td>
                    <td>{admin.name}</td>
                    <td>
                    <button
                    type="submit"
                    className="edit"
                    onClick={() => {
                      setHide(false);
                      setId(admin.id);
                    }}
                  >
                    <i className="fa fa-edit"></i>&nbsp;EDIT
                  </button>
                    </td>
                    <td>
                      <button
                        type="submit"
                        className="delete"
                        onClick={() => {
                          setShow(true);
                          setId(admin.id)
                          setName(admin.name)
                          console.log('here');
                        }}
                      >
                      <span className="icon-del">
                      <span className="top-del"></span>
                      <span className="bottom-del"></span>
                      </span>
                      <span className="text-del">
                      DELETE
                      </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <br></br>
            <br></br>
          </table>
        )}
      </div>
      <Pagination
                        paginate={paginate}
                        postsPerPage={postsPerPage}
                        totalPosts={filteredData.length}
                    />
    </div>
  );
}

export default Admin;