export default function Description({ title, description, step }) {
  return (
    <div className=" w-1/2 flex flex-col bg-white  rounded-xl p-6 items-center">
      <div className="w-1/2  ml-20">
        <h3 className=" text-lg font-bold text-gray-800 ">{title}</h3>
        <p className="mt-4 text-gray-500 text-lg">{description}</p>
      </div>

      <div className=" mt-18">

{
  (step === 'one') && <img src="/target.png" />

}

{
    (step === 'two') && <img src="/plan.png" />
}
        {
    (step === 'three') && <img src="/routine.png" />
}
        
      </div>
    </div>
  );
}
