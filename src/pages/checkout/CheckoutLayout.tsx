// CheckoutLayout.tsx
import { Step, StepLabel, Stepper } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectCheckoutActiveStep } from "@redux/slices/checkoutSlice";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { GoHome } from "react-icons/go";
import { MdPayment } from "react-icons/md";
import { BsFileText } from "react-icons/bs";

// Custom styling cho Stepper
const CustomStepper = styled(Stepper)({
  "& .MuiStepConnector-line": {
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: "#000",
  },
  "& .MuiStepLabel-label": {
    marginTop: "8px",
    fontSize: "14px",
    fontWeight: 500,
  },
});

// Custom styling cho Step icon
const CustomStep = styled(Step)({
  "& .MuiStepLabel-iconContainer": {
    "& .MuiSvgIcon-root": {
      width: "35px",
      height: "35px",
      border: "2px solid #000",
      borderRadius: "8px",
      backgroundColor: "#fff",
    },
    "& .Mui-active": {
      backgroundColor: "#000",
      color: "#fff",
    },
    "& .Mui-completed": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
});

const CheckoutLayout: React.FC = () => {
  const steps: { label: string; icon: React.ElementType }[] = [
    {
      label: "Address",
      icon: GoHome,
    },
    {
      label: "Payment Method",
      icon: MdPayment,
    },
    {
      label: "Review",
      icon: BsFileText,
    },
  ];

  const activeStep = useAppSelector(selectCheckoutActiveStep);

  return (
    <div className="mt-[50px]">
      <h1 className="text-5xl font-medium mb-[80px]">Payment Method</h1>
      <div className="max-w-[1000px] mx-auto px-4">
        <CustomStepper activeStep={activeStep}>
          {steps.map((step) => (
            <CustomStep key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <div
                    className={`flex flex-col items-center gap-4 text-center ${
                      activeStep >= steps.indexOf(step)
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <div
                      className={`
                    w-[50px] h-[50px] 
                    text-2xl
                    border-2 border-black 
                    rounded-lg
                    flex items-center justify-center
                    ${
                      activeStep >= steps.indexOf(step)
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }
                  `}
                    >
                      <step.icon />
                    </div>
                    <div className="font-medium">{step.label}</div>
                  </div>
                )}
              ></StepLabel>
            </CustomStep>
          ))}
        </CustomStepper>
      </div>

      <div className="checkout-content mt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default CheckoutLayout;
