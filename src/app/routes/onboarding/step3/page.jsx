import Description from "@/components/onboardingcomponents/Description";
import FormThree from "@/components/onboardingcomponents/FormThree";
import Tagline from "@/components/onboardingcomponents/Tagline";

export default function StepThree() {
  const tagline = "Nice, you've just build a routine!";
  const title = "Review your routine";
  const description = "You can make changes to your routine at any time.";

  return (
    <div>
      <Tagline tagline={tagline} />
      <div className="flex">
        <Description title={title} description={description} />
        <div className="w-1/2 flex flex-col bg-white  shadow-2xl rounded-xl p-6">
          <FormThree />
        </div>
      </div>
    </div>
  );
}
