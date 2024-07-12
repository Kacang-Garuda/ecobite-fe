'use client'
import { TableRow, TableCell } from '@/components/ui/table';
import { RegisteredEventType } from '@/modules/AuthenticationModule/interface';
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie'


interface tableRowDonationProps {
    id: string;
    image:string;
    name: string;
    email: string;
    phone:string;
    status: RegisteredEventType;
    reason: string;
    handleTrigger: () => void;}

const TableRowVolunteer: React.FC<tableRowDonationProps> = ({ id, image, name, email, phone, status, reason, handleTrigger  }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (isAccepted: boolean) => {
        const token = Cookies.get('token')

      if (token) {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/event/volunteer/${id}`,
                {
                    isAccepted: isAccepted
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );

        } catch (error) {
          console.error('Failed to fetch user data', error)
        } finally {
            handleTrigger()
        }
      }
    }
    const handleShowImage = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <TableRow className='text-[#333]'>
                <TableCell>
                    {status === 'PENDING' ? 
                    <div className='flex flex-row gap-1'>
                        <button onClick={() => handleSubmit(true)}>
                            <img src="/images/dashboard/check2-circle.svg" alt="Accept Button" />
                        </button>
                        <button onClick={() => handleSubmit(false)}>
                            <img src="/images/dashboard/x-circle.svg" alt="Reject Button" />
                        </button>
                    </div>
                    : (
                        status === 'REJECTED' ?
                        <label className='text-white text-xs py-2 px-6 bg-[#EB5757] rounded-lg'>
                            Rejected
                        </label>
                    :
                        <label className='text-white text-xs py-2 px-6 bg-[#449342] rounded-lg'>
                            Accepted
                        </label>
                    )
                    }
                </TableCell>
                <TableCell className='flex flex-row gap-2'>
                    <div className='w-max'>
                        <img src={image} alt={name} className='w-8 h-8 overflow-hidden rounded-full'/>
                    </div>
                    <p className='max-w-20'>{name}</p>
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{phone}</TableCell>
                <TableCell className='max-w-10 truncate px-2'><button className='h-max-[2.25rem] truncate w-max max-w-52' onClick={handleShowImage}>{reason}</button></TableCell>
            </TableRow>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center w-full max-h-screen bg-black bg-opacity-30 z-50 flex-col">
                    <div className='w-3/4 h-auto'>
                        <div className="bg-white p-5 rounded-lg shadow-lg relative flex items-center flex-col gap-4">
                            <p className='text-3xl font-bold text-[#188290]'>Reason</p>
                            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl">
                                <img src="/images/dashboard/x-square.svg" alt="Close Button" />
                            </button>
                            <div className='w-full h-[0.05rem] bg-[#B9B9B9]'></div>
                            <hr />
                            <div className='flex justify-center w-1/2'>
                                {reason}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableRowVolunteer;