import { useLocation } from "react-router-dom";
import { Typography, Chip, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import ResetPwdLab from "./ResetPwdLab";

const AuthLab = () => {
    const [lab, setLab] = useState<React.ReactNode>(
        <Typography>Sorry, no labs available yet</Typography>
    );
    const [labTitle, setLabTitle] = useState<string>('')

    const location = useLocation();
    const fromLocation = location.state?.from;

    useEffect(() => {
        switch (fromLocation) {
            case "keep-login":
                setLab(<Typography>Need to implement it ...</Typography>);
                setLabTitle("Keep me login")
                break;

            case "reset-pwd":
                setLab(<ResetPwdLab />);
                setLabTitle("I forgot my password")
                break;

            default:
                setLab(<Typography>Sorry, no labs available yet</Typography>);
        }
    }, [fromLocation]); // Re-run only when location changes

    return (
        <>
        <Typography variant="h4" color="primary" mb={2}>Authentication Lab</Typography>
        <Typography variant="h5" mb={2}>{labTitle}</Typography>
        <Chip 
            label="username=aragorn, password=123123" 
            color="primary" 
            sx={{ backgroundColor: '#86d3f1ff', color: '#073ca0ff', fontWeight: 'bold' }}
        />

        <Divider sx={{ margin: '24px 0' }}/>
        {lab}
        </>
    )
};

export default AuthLab;
