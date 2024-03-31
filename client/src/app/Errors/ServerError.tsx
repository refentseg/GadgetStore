import { Button, Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";

export default function ServerError(){
    const navigate = useNavigate();
    const {state} = useLocation();
    return(
        <Container component={Paper}>
            {state?.error?(
                <>
                <Typography variant='h3'>Sever error</Typography>
                <Divider/>
                <Typography>{state.error.detail || 'Internal Server error'}</Typography>
                </>
            ):(
                <Typography variant='h5'>Sever error</Typography>
            )}
            <Button onClick={()=> navigate('/catalog')}>Go back to store</Button>
        </Container>
    )
}