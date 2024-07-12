'use client'
import { Checkbox } from '@/components/ui/checkbox';
import { TableRow, TableCell } from '@/components/ui/table';
import { MoneyDonationProgressType } from '@/modules/AuthenticationModule/interface';
import React, { useState } from 'react';

interface tableRowDonationProps {
    id: string;
    date: string;
    name: string;
    receipt: string;
    status: MoneyDonationProgressType;
    isChecked: boolean;
    onCheckboxChange: (id: string) => void;
}

const TableRowDonation: React.FC<tableRowDonationProps> = ({ id, date, name, receipt, status, isChecked, onCheckboxChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowImage = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <TableRow className='text-[#333 ]'>
                <TableCell>
                    <Checkbox id={id} checked={isChecked} onCheckedChange={() => onCheckboxChange(id)} />
                </TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                    <button onClick={handleShowImage} className='hover:text-black text-[#495DC8] underline'>Show Image</button>
                </TableCell>
                <TableCell className='text-white'>
                    {status === 'PENDING' ? (
                        <label className='bg-[#E6C722] rounded-lg py-1 px-3'>
                            Pending
                        </label>
                    ) : status === 'CONFIRMED' ? (
                        <label className='bg-[#EBB057] rounded-lg py-1 px-3'>
                            Confirmed
                        </label>
                    ) : status === 'PURCHASED' ? (
                        <label className='bg-[#938142] rounded-lg py-1 px-3'>
                            Food Purchased
                        </label>
                    ) : (
                        <label className='bg-[#449342] rounded-lg py-1 px-3'>
                            Food Distributed
                        </label>
                    )}
                </TableCell>
            </TableRow>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center w-full max-h-screen bg-black bg-opacity-30 z-50 flex-col">
                    <div className='w-3/4 h-auto'>
                        <div className="bg-white p-5 rounded-lg shadow-lg relative flex items-center flex-col gap-4">
                            <p className='text-3xl font-bold text-[#188290]'>Receipt</p>
                            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl">
                                <img src="/images/dashboard/x-square.svg" alt="Close Button" />
                            </button>
                            <div className='w-full h-[0.05rem] bg-[#B9B9B9]'></div>
                            <hr />
                            <img src={receipt} alt="Receipt" className="w-2/5" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableRowDonation;