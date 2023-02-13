import React, { useState } from "react";
import pinkContactImg from "../Assets/Images/pinkContactImg.jpg";
import styles from "./contactManager.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { Modal } from "antd";
import { validFullName, validEmail, validPhone } from "../Regex";

function ContactManger() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState([{
    fullname:'',
    email:'',
    phone:'',
    company:'',
    address:''
  }]);
  const [fullnameErr, setFullNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [companyErr, setCompanyErr] = useState(false);
  const [detailsArray, setDetailsArray] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    handleSubmit()
  };

  const handleSubmit=(e)=>{
    if (!validFullName.test(modalText.fullname)) {
        setFullNameErr(true);
     };

    if (!validEmail.test(modalText.email)) {
        setEmailErr(true);
     }
     if (!validPhone.test(modalText.phone)) {
        setPhoneErr(true);
     }
     if (modalText.company === '') {
        setCompanyErr(true)
     }
     else  {
        handleContactDetails();
        setOpen(false)
        setModalText({
            fullname:'',
            email:'',
            phone:'',
            company:'',
            address:''
        })
        setFullNameErr('');
        setEmailErr('');
        setPhoneErr('');
        setCompanyErr('');
     }
  }

  const handleContactDetails=()=>{
    const userDetails = [];
    let obj = {...modalText, modalText}
    console.log(obj,"obj");
    userDetails.push(obj)
    console.log(userDetails,"array");
    setDetailsArray(userDetails,"length");
  }
  

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setModalText({
        ...modalText,
        [e.target.name]: e.target.value,
      });
  }

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
          <input type="text" placeholder="Search Contacts" />
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
            <form>
              <div class="input-group mb-3">
                <span className="input-group-text">Fullname <span className="text-danger">*</span></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Fullname"
                  value={modalText.fullname}
                  name='fullname'
                  onChange={(e)=>{handleChange(e)}}
                />
              </div>
              {fullnameErr && <p className="text-danger">Your name is invalid</p>}
              <div class="input-group mb-3">
                <span className="input-group-text">Email <span className="text-danger">*</span></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Email Id"
                  value={modalText.email}
                  name='email'
                  onChange={(e)=>{handleChange(e)}}
                />
              </div>
              {emailErr && <p className="text-danger">Your email is invalid</p>}
              <div class="input-group mb-3">
                <span className="input-group-text">Phone<span className="text-danger">*</span></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Phone Number"
                  value={modalText.phone}
                  name='phone'
                  onChange={(e)=>{handleChange(e)}}
                />
              </div>
              {phoneErr && <p className="text-danger">Phone number should be 10 digits</p>}
              <div class="input-group mb-3">
                <span className="input-group-text">Company <span className="text-danger">*</span></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Company Name"
                  value={modalText.company}
                  name='company'
                  onChange={(e)=>{handleChange(e)}}
                />
              </div>
              {companyErr && <p className="text-danger">Company name is required</p>}
              <div class="input-group mb-3">
                <span className="input-group-text">Address<span className="text-muted">(optional)</span></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Address"
                  value={modalText.address}
                  name='address'
                  onChange={(e)=>{handleChange(e)}}
                />
              </div>
            </form>
          </Modal>
        </div>
      </div>
      <div class="container my-4 mx-4">
        <div class="row">
          <div class="col-7">
            <div className={styles.contactHeaderTwo}>
              <div className="row">
                <div className="col-2">
                  <h6 className={styles.multiSelect}>+</h6>
                </div>
                <div className="col-5">
                  <span>Basic Info</span>
                </div>
                <div className="col-5">
                  <span>Company</span>
                </div>
              </div>
            </div>

            {/* Contact Info  */}

            {detailsArray?.map((item)=>(
                <div className={styles.contactInfo}>
                
{console.log(item,'item')}
                <div className="row">
                  <div className="col-2">
                    <h6 className={styles.multiSelect}>+</h6>
                  </div>
                  <div className="col-5">
                    <span>{item.modalText.fullname}</span>
                  </div>
                  <div className="col-5">
                    <span>{item.modalText.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div class="col-5">
            <div className={styles.contactCard}>column</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactManger;
