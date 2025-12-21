import StepperWrapper from "@/@core/styles/stepper"
import StepperCustomDot from "@/components/stepper-dot"
import { Step, StepLabel, Stepper, Typography, Box, Button } from "@mui/material"


type StepType = {
    label: string
    subtitle: string
    component: React.ReactNode
}

type TournamentInscriptionDesktopStepperProps = {
    steps: StepType[]
    activeStep: number
}

const TournamentInscriptionDesktopStepper = ({ steps, activeStep}: TournamentInscriptionDesktopStepperProps) => {


    return (
        <Box className='flex flex-col gap-6'>
            <StepperWrapper>
                <Stepper orientation='horizontal' activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={index} className='max-md:mbe-5'> 
                            <StepLabel
                         
                            slots={{
                              stepIcon: StepperCustomDot
                            }}>
                                <div className='step-label'>
                                <Typography className='step-number'>{`0${index + 1}`}</Typography>
                                    <div>
                                        <Typography className='step-title' color='text.primary'>
                                            {step.label}
                                        </Typography>
                                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                                    </div>
                                </div>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </StepperWrapper>
            <Box className='mt-6 md:mx-32 flex flex-col gap-4 justify-end'>
                {steps[activeStep]?.component} 
            </Box>
        </Box>
    )
}

export default TournamentInscriptionDesktopStepper