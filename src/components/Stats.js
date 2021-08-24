import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: "white",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: "16px 32px 24px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
}));

const Stats = () => {
    const styles = useStyles();

    const [modal, setModal] = useState(false);

    const openCloseModal = () => {
        setModal(!modal);
    };

 

    const body = (
        <div className={styles.modal}>
            <div align="center">
                <h3>SCORES</h3>
            </div>
            <div>NAME</div>
            <div>SCORE</div>
          
            <Button onClick={openCloseModal}>Close</Button>
            hola soy un modal
        </div>
    );

    return (
        <div>
            <Modal open={modal} onClose={openCloseModal}>
                {body}
            </Modal>
        </div>
    );
};

export default Stats;
