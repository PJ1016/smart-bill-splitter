import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { CloudUpload, AutoAwesome, Save } from '@mui/icons-material';

interface ProgressStepperProps {
  activeStep: number;
}

const steps = [
  { label: 'Upload Image', icon: CloudUpload },
  { label: 'Extract Details', icon: AutoAwesome },
  { label: 'Save Memory', icon: Save },
];

const CustomStepIcon = ({ active, completed, icon }: { active?: boolean; completed?: boolean; icon: React.ReactNode }) => {
  const IconComponent = steps[Number(icon) - 1]?.icon || CloudUpload;
  
  return (
    <Box
      sx={{
        color: completed || active ? 'primary.main' : 'grey.400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: completed || active ? 'primary.light' : 'grey.100',
        border: `2px solid ${completed || active ? 'primary.main' : 'grey.300'}`,
      }}
    >
      <IconComponent sx={{ fontSize: 20, color: completed || active ? 'primary.main' : 'grey.400' }} />
    </Box>
  );
};

const ProgressStepper = ({ activeStep }: ProgressStepperProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label} completed={index < activeStep}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressStepper;