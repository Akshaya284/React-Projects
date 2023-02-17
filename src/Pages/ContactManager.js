import React, { useEffect, useState } from "react";
import pinkContactImg from "../Assets/Images/pinkContactImg.jpg";
import styles from "./contactManager.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Modal } from "antd";
import { validName, validEmail, validPhone } from "../Regex";
import successTick from "../Assets/Images/successTick.png";
import Lottie from "react-lottie";
import animationData from "../Assets/Lottie/no data.json.json";
import Avatar from "react-avatar";
import randomcolor from "randomcolor";

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
    designation: "",
    company: "",
    address: "",
    isChecked: false,
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [multiSelect, setMultiSelect] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc')


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const backgroundColor = randomcolor();

  const selectedContactData = contactData !== null ? users[contactData] : null;

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
    if (!userDetails.designation) {
      errors.designation = "Designation name is required";
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
          designation: "",
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
    users.map((user) => {
      if (!user.isChecked) {
        alert('Please select contacts to delete')
      }
      else {
        const newUserDetails = users.filter((user) => !user.isChecked);
        console.log(newUserDetails, "newUserDetails");
        setUsers(newUserDetails);
      }
      return
    })
  };

  const sortContacts = (users, sortOrder) => {
    if (sortOrder === 'asc') {
      return users.sort((a, b) => a.firstname.localeCompare(b.firstname));
    } else if (sortOrder === 'desc') {
      return users.sort((a, b) => b.firstname.localeCompare(a.firstname));
    }
    return users;
  }

  const sortedContacts = sortContacts(users, sortOrder);
  console.log(sortedContacts, "sortedContacts");


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
          <select className="border border-0 fw-bold" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value='asc'>Name (A-Z)</option>
            <option value='desc'>Name (Z-A)</option>
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
            <AiOutlineSearch color="black" />
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
                  Designation <span className="text-danger">*</span>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your designation"
                  value={userDetails.designation}
                  name="designation"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
              {errors.designation && (
                <p className="text-danger">{errors.designation}</p>
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
          <div className="col col-lg-7 col-sm-12">
            <div className={styles.contactHeaderTwo}>
              <div className="row">
                {!multiSelect ? (
                  <div className="col-2">
                    <h6
                      className={styles.multiSelect}
                      onClick={handleCheckAll}
                    >
                      +
                    </h6>
                  </div>
                ) : (
                  <div className="col-2" onClick={handleUnCheckAll}>
                    <h6 className={styles.multiSelect}>-</h6>
                  </div>
                )}
                <div className="col-6">
                  <span>Basic Info</span>
                </div>
                <div className="col-4">
                  <span className="ms-3">Company</span>
                </div>
              </div>
            </div>
            <div>
              {users.length !== 0 && multiSelect && (
                <div className={styles.deleteAll}>
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
              <div key={index} onClick={() => setContactData(index)}>
                <div className={contactData === index ? styles.activeDiv : styles.contactInfo} key={index}>
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
                          <Avatar
                            name={`${user.firstname.substring(
                              0,
                              1
                            )} ${user.lastname.substring(0, 1)}`}
                            size="45"
                            round={true}
                            style={{ backgroundColor: backgroundColor }}
                          />
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
                      <span className="ms-5">{user.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col col-lg-4 col-sm-12">
            <div className={styles.contactCard}>
              {users.length !== 0 && <div >
                {selectedContactData ? (
                  <div
                    className={styles.customContactCard}
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <div>
                      <Avatar
                        name={`${selectedContactData.firstname.substring(
                          0,
                          1
                        )} ${selectedContactData.lastname.substring(0, 1)}`}
                        size="65"
                        round={true}
                        className={styles.customAvatar}
                      />
                      <h5 class="card-title text-center mt-3 text-bold">
                        {selectedContactData.firstname}{" "}
                        {selectedContactData.lastname}
                      </h5>
                      <p class="card-text text-center">
                        {selectedContactData.designation} @{" "}
                        {selectedContactData.company}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <ul class="list-group list-group-flush mt-5">
                        <li class="list-group-item">Name: </li>
                        <li class="list-group-item">Email: </li>
                        <li class="list-group-item">Phone: </li>
                        <li class="list-group-item">Company: </li>
                        <li class="list-group-item">Address: </li>
                      </ul>
                      <ul class="list-group list-group-flush mt-5">
                        <li class="list-group-item">
                          <span className="fw-1">
                            {selectedContactData.firstname} {users[0].lastname}
                          </span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{selectedContactData.email} </span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{selectedContactData.phone} </span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{selectedContactData.company}</span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{selectedContactData.address}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className={styles.customContactCard}>
                    <div>
                      <Avatar
                        name={`${users[0]?.firstname.substring(
                          0,
                          1
                        )} ${users[0]?.lastname.substring(0, 1)}`}
                        size="65"
                        round={true}
                        className={styles.customAvatar}
                      />
                      <h5 class="card-title text-center mt-3 text-bold">
                        {users[0]?.firstname} {users[0]?.lastname}
                      </h5>
                      <p class="card-text text-center">
                        {users[0]?.designation} @ {users[0]?.company}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <ul class="list-group list-group-flush mt-5">
                        <li class="list-group-item">Name: </li>
                        <li class="list-group-item">Email: </li>
                        <li class="list-group-item">Phone: </li>
                        <li class="list-group-item">Company: </li>
                        <li class="list-group-item">Address: </li>
                      </ul>
                      <ul class="list-group list-group-flush mt-5">
                        <li class="list-group-item">
                          <span className="fw-1">
                            {users[0]?.firstname} {users[0]?.lastname}
                          </span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{users[0]?.email} </span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{users[0]?.phone} </span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{users[0]?.company}</span>
                        </li>
                        <li class="list-group-item">
                          <span className="">{users[0]?.address}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactManger;
