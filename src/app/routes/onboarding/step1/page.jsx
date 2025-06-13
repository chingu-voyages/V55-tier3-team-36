import Description from "@/components/onboardingcomponents/Description";
import FormOne from "@/components/onboardingcomponents/FormOne";
import Tagline from "@/components/onboardingcomponents/Tagline";

export default function StepOne() {
  const tagline = "Looks like you're new here, welcome!";
  const title = "Set a goal";
  const description =
    "A goal offers both direction and motivation for your routine.";

  return (
    <div>
      <Tagline tagline={tagline} />
      <div className="flex">
        <Description title={title} description={description} step={'one'} />
        <div className="w-1/2  flex flex-col bg-white  rounded-xl p-6">
          <FormOne />
        </div>
      </div>
    </div>
  );
}
