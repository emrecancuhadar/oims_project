import React, { useContext } from 'react';
import styles from '../CSS/StudentHomepage.module.css';
import Header from '../components/Header';
import StudentSidebar from '../components/StudentSidebar';
import { UserContext } from '../context/UserProvider';

function StudentHomepage() {
    const { user } = useContext(UserContext);

    return (
        <div className={styles.studentHomepage}>
        <StudentSidebar />
            <div className={styles.mainContent}>
                    <Header username={user.name} />
                <div className={styles.homepage}>
                    <div className={styles.titleContainer}>
                        <h1>Welcome to OIMS!</h1>
                    </div>
                    <div className={styles.homepageContainer}>
                        <div className={styles.card}>

                        </div>
                        <div className={styles.card}>

                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
);
}

export default StudentHomepage;
