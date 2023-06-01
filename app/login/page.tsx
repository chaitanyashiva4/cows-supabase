import React from 'react';
import Boy from '../../public/Boy.png';
import Image from 'next/image';

const page = () => {
    return (
        <div className="flex justify-center items-center mt-5">
            <div className='shadow rounded-md w-80'>
                <Image src={Boy} alt='Boy' className='ms-3'></Image>
                <div className="p-2 text-center rounded-md" style={{ width: '319px', marginTop: '-110px', backgroundColor: 'rgba(0,0,0,0.0)' }}>
                    <h2 className='text-neutral font-bold'>Are You An Existing User</h2>
                    <a href="/signin"><button className='btn  btn-warning font-bold'>Login</button></a>
                    <a href="/signup"><button className='btn btn-neutral-focus font-bold'>SignUp</button></a>
                    
                    <div>
                        <a href="/" className='text-neutral font-semibold text-sm'>Skip - Do it Later</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;