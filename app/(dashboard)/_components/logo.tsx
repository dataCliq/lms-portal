import Image from 'next/image'

const Logo = () => {
    return ( 
        <Image height={140} width={150} alt='logo' src='/logo.png' className='cursor-pointer hover:animate-slowspin'/>
     );
}
 
export default Logo;