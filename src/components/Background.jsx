import Image from "next/image";
import landingbg from "../../public/landingbg.png";
import background from "../../public/background.png";

export default function Background() {
  return (
    <div className="bg-fixed ">
      <Image src={background} fill />
    </div>
  );
}
