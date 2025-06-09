import Stepper from "@/components/onboardingcomponents/Stepper";

export default function OnboardingLayout({ children }) {
  return (
    <div>
      <Stepper />
      <div>{children}</div>
    </div>
  );
}
