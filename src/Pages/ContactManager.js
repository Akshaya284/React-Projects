import React, { useEffect, useState } from "react";
import pinkContactImg from "../Assets/Images/pinkContactImg.jpg";
import styles from "./contactManager.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Modal } from "antd";
import { validName, validEmail, validPhone } from "../Regex";
import successTick from "../Assets/Images/successTick.png";
import Lottie from "react-lottie";
import animationData from "../Assets/Lottie/no data.json.json";
import Avatar from 'react-avatar';
import randomcolor from 'randomcolor';



function ContactManger() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [users, setUsers] = useState(
    JSON.parse(window.localStorage.getItem("users")) || []
  );
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    isChecked: false,
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [multiSelect, setMultiSelect] = useState(false);
  const [select, setSelect] = useState(false);
  const [selectUsers, setSelectUser] = useState([]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const fn = users.map((item)=>{
  //   console.log(item.firstname.length,"item");
  //   return item.firstname
  // });
  // const ln = users.map((item)=>{
  //   return item.lastname
  // });

  // console.log(fn.length,ln,'avatar');

  // const initials = fn.substring(0, 1) + ln.substring(0, 1);

  const backgroundColor = randomcolor();


  // load data from Local Storage when the component mounts

  useEffect(() => {
    const data = localStorage.getItem("users");
    setUsers(JSON.parse(data));
    console.log(data, "data");
  }, []);

  // update Local Storage when userDetails changes

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    const errors = {};

    if (!userDetails.firstname) {
      errors.firstname = "Username is required";
    } else if (!validName.test(userDetails.firstname)) {
      errors.firstname = "Username format is not supported";
    }
    if (!userDetails.lastname) {
      errors.lastname = "Username is required";
    } else if (!validName.test(userDetails.lastname)) {
      errors.lastname = "Username format is not supported";
    }
    if (!userDetails.email) {
      errors.email = "Email is required";
    } else if (!validEmail.test(userDetails.email)) {
      errors.email = "Invalid email format";
    }
    if (!userDetails.phone) {
      errors.phone = "Phone number is required";
    } else if (!validPhone.test(userDetails.phone)) {
      errors.phone = "Phone number should contain 10 digits";
    }
    if (!userDetails.company) {
      errors.company = "Company name is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setUsers((prevState) => [...prevState, userDetails]);
      setConfirmLoading(true);
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(false);
        setUserDetails({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          company: "",
          address: "",
        });
      }, 1000);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().includes(search.toLowerCase())
  );

  const handleCheck = (id) => {
    setMultiSelect(true);
    const newUserDetails = users.map((user, index) => {
      if (index === id) {
        user.isChecked = !user.isChecked;
      }
      return user;
    });
    setUserDetails(newUserDetails);
  };

  const handleCheckAll = () => {
    setMultiSelect(true);
    const newUserDetails = users.map((user) => {
      user.isChecked = true;
      return user;
    });
    setUsers(newUserDetails);
  };

  const handleUnCheckAll = () => {
    setMultiSelect(false);
    const newUserDetails = users.map((user) => {
      user.isChecked = false;
      return user;
    });
    setUsers(newUserDetails);
  };

  const handleDelete = () => {
    const newUserDetails = users.filter((user) => !user.isChecked);
    setUsers(newUserDetails);
  };

  return (
    <div className={styles.mainPart}>
      <div className={styles.contactHeader}>
        <div>
          <img src={pinkContactImg} alt="contactsImg" height={30} width={30} />
        </div>
        <div>
          <h3>Contacts</h3>
          <span>Welcome to Ak's contact Manager</span>
        </div>
        <div className={styles.sortBy}>
          <span>Sort by: </span>
          <select className="border border-0 fw-bold">
            <option>Date Created</option>
            <option>Ascending</option>
            <option>Descending</option>
          </select>
        </div>
      </div>
      <div className={styles.searchContacts}>
        <div className={styles.searchInput}>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <button>
            <AiOutlineSearch />
          </button>
        </div>
        <div>
          <button onClick={showModal}> + Add Contact</button>
          <Modal
            title="Add New Contact"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Firstname <span className="text-danger">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Firstname and last name"
                  value={userDetails.firstname}
                  name="firstname"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {errors.firstname && (
                <p className="text-danger">{errors.firstname}</p>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Lastname <span className="text-danger">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Firstname and last name"
                  value={userDetails.lastname}
                  name="lastname"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {errors.lastname && (
                <p className="text-danger">{errors.lastname}</p>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Email <span className="text-danger">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email Id"
                  value={userDetails.email}
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Phone<span className="text-danger">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  value={userDetails.phone}
                  name="phone"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Company <span className="text-danger">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Company Name"
                  value={userDetails.company}
                  name="company"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {errors.company && (
                <p className="text-danger">{errors.company}</p>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text">
                  Address<span className="text-muted">(optional)</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  value={userDetails.address}
                  name="address"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div className="container my-4 mx-4">
        <div className="row">
          <div className="col-7">
            <div className={styles.contactHeaderTwo}>
              <div className="row">
                {multiSelect ? (
                  <div className="col-2">
                    <h6
                      className={styles.multiSelect}
                      onClick={handleUnCheckAll}
                    >
                      -
                    </h6>
                  </div>
                ) : (
                  <div className="col-2" onClick={handleCheckAll}>
                    <h6 className={styles.multiSelect}>+</h6>
                  </div>
                )}
                <div className="col-6">
                  <span>Basic Info</span>
                </div>
                <div className="col-4">
                  <span>Company</span>
                </div>
              </div>
            </div>
            <div>
              {multiSelect && (
                <div className={styles.deleteAll}>
                  {/* <span> selected Items </span> */}
                  <button onClick={handleDelete}>Delete</button>
                  <button
                    className={styles.cancelBtn}
                    onClick={handleUnCheckAll}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {users.length === 0 && (
                <div className={styles.deleteAllMsg}>
                  <Lottie options={defaultOptions} height={400} width={400} />
                  <span>No Contacts found ! Please add some !</span>
                </div>
              )}
            </div>

            {/* Contact Info  */}

            {filteredUsers.map((user, index) => (
              <div key={index}>
                <div className={styles.contactInfo} key={index}>
                  <div className="row">
                    <div className="col-2">
                      <input
                        type="checkbox"
                        checked={user.isChecked}
                        onChange={() => handleCheck(index)}
                      />
                    </div>
                    <div className="col-6 d-flex">
                      <div>
                      <span>
                      <Avatar name={`${user.firstname.substring(0,1)} ${user.lastname.substring(0,1)}`} size="45" round={true} style={{ backgroundColor: backgroundColor }} />
                      </span>
                      </div>
                      <div className="ms-3">
                      <span className="fw-bold">
                        {user.firstname} {user.lastname}
                      </span>
                      <p>{user.email}</p>
                      </div>
                    </div>
                    <div className="col-4">
                      <span>{user.company}</span>
                    </div>
                  </div>
                </div>
                {/* <button onClick={() => handleDelete(index)}>Delete</button> */}
              </div>
            ))}
          </div>
          <div className="col-5">
            <div className={styles.contactCard}>
                {/* <div>
                  <p>{filteredUsers[0].firstname}</p>
                  <p>{filteredUsers[0].lastname}</p>
                  <p>{filteredUsers[0].email}</p>
                  <p>{filteredUsers[0].company}</p>
                  <p>{filteredUsers[0].address}</p>
                </div>                 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactManger;
