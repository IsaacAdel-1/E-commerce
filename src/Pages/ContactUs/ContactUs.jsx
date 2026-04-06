
import { LucideMapPin, LucideMail, LucidePhone ,Send } from 'lucide-react';
const ContactUsCanvaDesign = "https://www.canva.com/ai/code/thread/24054d78-046d-4481-8ddc-8145d5be951b";
const ContactUs = ()=>{

    return(
        <>
            <div className="contact-usss w-[100wv] bg-[#f9fafb] p-8">
                <div className="contactHeader text-center">
                    <h2 className='text-3xl font-bold'>Contact Us</h2>
                    <p className='text-2xl mt-2 mb-[80px] text-[#8f9090]'>We'd love to hear from you</p>
                </div>

                <div className="contact-info-container flex justify-around">
                    <div className="address bg-[#eef2ff] flex flex-col pl-[20px] w-[270px] p-6 rounded-2xl gap-[20px]">
                        <div className='flex items-center text-center gap-[15px]'>
                            <LucideMapPin className='text-white size-[40px] bg-[#155dfc] rounded p-2'/> 
                            <p className='text-xl font-semibold '>Address</p>
                        </div>
                        <p>Assiut-New Assiut</p>
                    </div>

                    <div className="Email bg-[#eef2ff] flex flex-col pl-[20px] w-[270px] p-6 rounded-2xl gap-[20px]">
                        <div className='flex items-center text-center gap-[15px]'>
                            <LucideMail className='text-white size-[40px] bg-[#155dfc] rounded p-2'/> 
                            <p className='text-xl font-semibold '>Email</p>
                        </div>
                        <p>isaacerian5@gmail.com</p>
                    </div>

                    <div className="phone bg-[#eef2ff] flex flex-col pl-[20px] w-[270px] p-6 rounded-2xl gap-[20px]">
                        <div className='flex items-center text-center gap-[15px]'>
                            <LucidePhone className='text-white size-[40px] bg-[#155dfc] rounded p-2'/>
                            <p className='text-xl font-semibold '>Phone</p>
                        </div>

                        <p>0150-093-4506</p>
                    </div>
            
                </div>

                <form action="" className='w-[60%] bg-white px-8 py-6 rounded-xl mx-[auto] my-14'>
                    <h2 className='text-2xl font-bold pt-3 pb-2'>Send us a Message</h2>

                    <div className="formInputs">
                        <div className='flex flex-col gap-4'>
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder='Your full name' id='name' className='p-4 bg-[#f9fafb] rounded-lg mb-6'/>
                        </div>

                        <div className='flex flex-col  gap-4'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='You.email@example.com' id='email' className='p-4 bg-[#f9fafb] rounded-lg mb-6'/>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <label htmlFor="subject">Subject</label>
                            <input type="text" placeholder="What's this about?" id='subject' className='p-4 bg-[#f9fafb] rounded-lg mb-6'/>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <label htmlFor="message">Message</label>
                            <textarea type="textarea" placeholder='Tell us more...' id='message' className='p-4 bg-[#f9fafb] rounded-lg mb-6 ' rows={6}/>
                        </div>
                    </div>
                    <button className='bg-blue-600 text-white w-[100%] py-2 rounded-lg tracking-wider text-[16px] flex justify-center gap-2 cursor-pointer' type='submit' > <Send/> Send Message</button>
                </form>
            </div>
        </>
    )
}

export default ContactUs ;