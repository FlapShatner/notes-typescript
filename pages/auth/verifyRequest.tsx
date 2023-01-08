import {BiMailSend} from 'react-icons/bi'

 const verifyRequest = () => {
  return (
    <div className="container mx-auto py-48 flex justify-center text-center">
      <div className='border-4 border-primary-500 mx-4 border-dashed rounded-lg pt-8 w-screen md:max-w-lg'>
        <div className='w-fit text-primary-500 mx-auto mb-4'>
      <BiMailSend size={'6rem'}/>
      </div>
        <h1 className='text-primary-500 font-semibold text-2xl'>Check your email </h1>
        <p className='text-primary-500 text-sm mt-4 mb-3 w-1/2 md:w-full mx-auto'>You will be automatically logged in when you click the link inside</p>
      </div>
    </div>
  )
}

export default verifyRequest