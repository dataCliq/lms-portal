import Image from 'next/image'

const Logo = () => {
    return ( 
        <Image height={80} width={80} alt='logo' src='/logo.jpg' className='cursor-pointer hover:animate-slowspin'/>
     );
}
 
export default Logo;