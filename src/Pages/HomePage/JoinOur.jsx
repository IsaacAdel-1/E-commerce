import './JoinOur.css';


const JoinOur = () => {
  return (
    <>
      <div className="join-our" id='join-our'>
        <div className="JoinOurText flex justify-center flex-col items-center">
          <h2 className='font-black text-2xl mb-2 tracking-wider'>Stay Updated with Our Latest Offers</h2>
          <p className='tracking-wider w-[350px] text-gray-500'>Join our newsletter for exclusive discounts and product releases</p>
        </div>

        <div className="EnterEmail flex mt-[40px] ">
            <input type="email" placeholder="Enter your email" className='bg-white focus:ring-2 focus:ring-blue-400 outline-none'/>
            <button>Subscribe</button>
        </div>
      </div>
    </>
  );
};

export default JoinOur;