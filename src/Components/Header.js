import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosAdd, IoMdNotificationsOutline } from 'react-icons/io'
import { RxAvatar } from 'react-icons/rx'
import styles from './header.module.scss'
function Header() {
    return (
        <div className={styles.header}>
            <nav class="navbar border border-bottom shadow-sm p-2">
                <div class="container-fluid">
                    <div className={styles.headerSearch}>
                        <AiOutlineSearch size={28} className={styles.searchIcon} />
                    </div>
                    <div className={styles.headerOptions}>
                        <div>
                            <IoIosAdd size={28}/>
                            <span>Add</span>
                        </div>
                        <div>
                            <RxAvatar size={25}/>
                        </div>
                        <div>
                            <select className='border border-0 fw-bold fs-5'>
                                <option>Akshaya</option>
                                <option>Logout</option>
                            </select>
                        </div>
                        <div>
                           <IoMdNotificationsOutline size={28}/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
export default Header;