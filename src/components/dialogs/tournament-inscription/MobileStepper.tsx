import { Button, Box } from '@mui/material';
import MobileStepper from '@mui/material/MobileStepper';

type StepType = {
    label: string
    subtitle: string
    component: React.ReactNode
}

type TournamentInscriptionMobileStepperProps = {
    steps: StepType[]
    activeStep: number
    onNext?: () => void
    onBack?: () => void
    isNextDisabled?: boolean
}

const TournamentInscriptionMobileStepper = ({ steps, activeStep, onNext, onBack, isNextDisabled }: TournamentInscriptionMobileStepperProps) => {

    return (
        <Box className='flex flex-col gap-4'>
            <Box className='mb-4'>
                {steps[activeStep]?.component}
            </Box>
            <MobileStepper
                variant="progress"
                steps={steps.length}
                activeStep={activeStep}
                nextButton={<Button onClick={onNext} disabled={isNextDisabled}>{activeStep === steps.length - 1 ? 'Completar inscripción' : 'Siguiente'}</Button>}
                backButton={<Button onClick={onBack} disabled={activeStep === 0}>Anterior</Button>}
            />
        </Box>
    )
}

export default TournamentInscriptionMobileStepper