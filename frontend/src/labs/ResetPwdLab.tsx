import { useState } from "react";
import { toast } from 'react-toastify';
import { Box, Typography, Button, TextField, Fade } from "@mui/material";
import LoginForm from "../components/Login";
import { resetPwdRequest, resetPwdConfirm } from "../services/authServices";
import { ConnectionLine, StepContainer, StepWrapper } from "../components/StepAnimation";
import type { StepsMap } from "../types/steps";

const ResetPwdLab = () => {
    const [step, setStep] = useState(4);
    const [tempPwd, setTempPwd] = useState("");
    const [token, setToken] = useState("");


    const steps: StepsMap = {
        step1: [
            { desc: 'You have forgotten your password.', status: 'success' },
            { desc: 'Send a request to reset it', status: 'success' },
        ],
        step2: [
            { desc: 'The server create a random token', status: 'success' },
            { desc: 'Don\'t forget it: the token need to be not previsible', status: 'warning' },
        ],
        step3: [
            { desc: 'The server create a random token', status: 'success' },
            { desc: 'Don\'t forget it: the token need to be not previsible', status: 'warning' },
        ],
        step4: [
            { desc: 'The server create a random token', status: 'success' },
            { desc: 'Don\'t forget it: the token need to be not previsible', status: 'warning' },
        ]
    };


    const handleSubmit = (username: string, password: string, data: any) => {
        console.log("The lab require click on 'reset password'");
    };

    const handleResetPwdRequest = async (username: string) => {
        if (!username) 
            return;
        

        try {
            const { data: resp } = await resetPwdRequest(username);

            if (resp.ok) {
                setToken(resp.token);
                setStep(2); 
            } 
            else {
                console.error("Server error:", resp.error);
            }
        } catch (err: any) {
            console.error("Network or unexpected error:", err.message || err);
        }
    };

    const handleResetPwdConfirm = async () => {
        
        if (!tempPwd) {
            toast.warning("A password is required")
            return;
        }

        try {
            const { data: resp } = await resetPwdConfirm(token, tempPwd);

            if (resp.ok) {
                console.log("Reset token:", resp.token);
                setStep(4); 
            } 
            else {
                console.error("Server error:", resp.error);
            }
        } catch (err: any) {
            console.error("Network or unexpected error:", err.message || err);
        }
    };
  
    return (
        <Box sx={{ mt: 4, mb:4, alignContent:'center' }}>

            <StepWrapper step={1} stepItems={steps.step1} >
                <StepContainer isVisible={step >= 1} isCurrentStep={step==1} >

                    <LoginForm 
                        isResetPwd={true}
                        onLogin={handleSubmit}
                        onResetPwd={handleResetPwdRequest}
                    />
                </StepContainer>
            </StepWrapper>

            {step > 1 && 
                <>
                <ConnectionLine />
                <StepWrapper step={2} stepItems={steps.step2} >
                    <StepContainer isVisible={step >= 2} isCurrentStep={step==2}>
                        <Typography variant="h5" mb={2}>📩</Typography>
                        <Typography sx={{ mt: 1, mb:1 }}>
                        Hi :) , click the button below to reset your password.
                        </Typography>
                        <Button
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={() => setStep(3)}
                        >
                        Open reset link
                        </Button>
                    </StepContainer>
                </StepWrapper>
                </>
            }


            {step > 2 && 
                <>
                <ConnectionLine />
                <StepWrapper step={3} stepItems={steps.step3} >
                    <StepContainer isVisible={step >= 3} isCurrentStep={step==3}>
                        <Typography variant="h5" mb={2}>Welcome back :)</Typography>
                        <Typography sx={{ opacity: 0.7 }}>
                        Enter the temporary password sent to your email:
                        </Typography>

                        <TextField
                        label="Temporary password"
                        fullWidth
                        sx={{ mt: 2 }}
                        value={tempPwd}
                        onChange={(e) => setTempPwd(e.target.value)}
                        />

                        <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleResetPwdConfirm}
                        >
                        Continue
                        </Button>
                    </StepContainer>
                </StepWrapper>
                </>
            }
            {step > 3 && 
                <>
                <ConnectionLine />
                <StepWrapper step={4} stepItems={steps.step4} >
                    <StepContainer isVisible={step === 4} isCurrentStep={false}>
                        <Typography variant="h5" color="success" mb={1}>
                        🔐 Password reset complete
                        </Typography>
                        <Typography>You can now log in securely.</Typography>
                    </StepContainer> 
                </StepWrapper>
                </>
            }


        </Box>
    );
}

export default ResetPwdLab

