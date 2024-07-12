import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoneyDonation, MoneyDonationProgress, MoneyDonationProgressType } from '@/modules/AuthenticationModule/interface';
import axios from 'axios';
import Cookies from 'js-cookie';
import TableRowDonation from '../../../../components/elements/DashboardElements/TableRow';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MoneyReceived = () => {
    const [moneyDonation, setMoneyDonation] = useState<MoneyDonation[] | null>(null);
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [statusChoosed, setStatusChoosed] = useState('');
    const [trigger, setTrigger] = useState(false)
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token');

            if (token) {
                try {
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/money-donation/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    setMoneyDonation(response.data.data);
                } catch (error) {
                    console.error('Failed to fetch user data', error);
                }
            }
        };

        fetchUserData();
    }, [trigger]);

    const handleCheckboxChange = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleTrigger = () => {
        setTrigger((prev) => !prev)
    }

    const handleEditSelected = () => {
        const checkedIds = Object.keys(checkedItems).filter((key) => checkedItems[key]);
        if (checkedIds.length > 0) {
            const statuses = moneyDonation
                ?.filter((donation) => checkedIds.includes(donation.id))
                .map((donation) => donation.progress[donation.progress.length - 1].status);

            const allSameStatus = statuses?.every((status) => status === statuses[0]);
            {
                statuses && setStatusChoosed(statuses[0])
            }
            if (allSameStatus) {
                setIsModalOpen(true);
            }
        }
    };

    const handleSubmitChanges = async () => {
        const checkedIds = Object.keys(checkedItems).filter((key) => checkedItems[key]);
        try {
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/money-donation/`,
                {
                    status: selectedStatus,
                    moneyDonationIds: checkedIds,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            handleTrigger()
        } catch (error) {
            console.error('Failed to update statuses', error);
        } finally {
            setIsSecondModalOpen(false);
        }
    }

    const handleSaveChanges = async () => {
        setIsModalOpen(false)
        setIsSecondModalOpen(true)
        
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCloseSecondModal = () => {
        setIsSecondModalOpen(false);
    };

    return (
        <div>
            {moneyDonation && moneyDonation.length > 0 ? (
                <div className='flex w-full flex-col py-10 px-8 gap-6'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <p className='text-3xl font-bold text-[#02353C]'>Money Received</p>
                        </div>
                        <div className='flex flex-row gap-3'>
                            <button onClick={handleEditSelected} className='px-10 py-4 signup-shadow rounded-lg text-white text-lg bg-[#188290] hover:bg-[#02353C] font-semibold'>
                                Edit Selected
                            </button>
                        </div>
                    </div>
                    <Table className='rounded-lg shadow-md'>
                        <TableHeader className='bg-[#E6F1F3] text-lg'>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className='text-[#188290] font-bold'>Date</TableHead>
                                <TableHead className='text-[#188290] font-bold'>Name</TableHead>
                                <TableHead className='text-[#188290] font-bold'>Receipt</TableHead>
                                <TableHead className='text-[#188290] font-bold'>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {moneyDonation.map((value) => (
                                <TableRowDonation
                                    key={value.id}
                                    id={value.id}
                                    date={format(new Date(value.createdAt), 'dd/MM/yyyy hh:mm aa')}
                                    name={value.donor.name}
                                    receipt={value.payment}
                                    status={value.progress[value.progress.length - 1].status}
                                    isChecked={checkedItems[value.id]}
                                    onCheckboxChange={() => handleCheckboxChange(value.id)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
                ) : (
                <div className='flex w-full flex-col py-10 px-8 gap-6'>
                    <div className='flex justify-center items-center'>
                        <div>
                            <p className='text-3xl font-bold text-[#02353C]'>Money Received</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full h-full p-20">
                        <p className="font-bold text-xl text-[#828282]">
                            No one has donated yet :(
                        </p>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center w-full max-h-screen bg-black bg-opacity-30 z-50 flex-col">
                    <div className='w-3/4 h-auto'>
                        <div className="bg-white py-5 rounded-lg shadow-lg relative flex items-center flex-col gap-4">
                            <p className='text-3xl font-bold text-[#02353C]'>Edit Selected</p>
                            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl">
                                <img src="/images/dashboard/x-square.svg" alt="Close Button" />
                            </button>
                            <div className='w-full h-[0.05rem] bg-[#B9B9B9]'></div>
                            <div className='flex flex-col w-full px-10 items-start pb-28 gap-2'>
                                <p className='text-lg font-semibold'>Status</p>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="w-3/5 p-2 border border-gray-300 rounded-md gap-1 justify-start">
                                        <img src="/images/dashboard/clock-history.svg" alt="Clock History" className='w-6 h-6'/>
                                        <SelectValue placeholder="Select Status"/>
                                    </SelectTrigger>
                                        {statusChoosed === 'PENDING' ? 
                                        <SelectContent>
                                            <SelectItem value="CONFIRMED">Donation Confirmed</SelectItem>
                                            <SelectItem value="PURCHASED">Food Purchased</SelectItem>
                                            <SelectItem value="DISTRIBUTED">Food Distributed</SelectItem>
                                        </SelectContent>
                                            :
                                        (statusChoosed === 'CONFIRMED' ?
                                        <SelectContent>
                                            <SelectItem value="PURCHASED">Food Purchased</SelectItem>
                                            <SelectItem value="DISTRIBUTED">Food Distributed</SelectItem>
                                        </SelectContent>
                                        :
                                        <SelectContent>
                                            <SelectItem value="DISTRIBUTED">Food Distributed</SelectItem>
                                        </SelectContent>
                                        )}
                                </Select>
                            </div>
                            <button onClick={handleSaveChanges} className='mt-4 px-6 py-2 bg-[#188290] hover:bg-[#02353C] text-white rounded-lg'>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isSecondModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center w-full max-h-screen bg-black bg-opacity-30 z-50 flex-col">
                    <div className='w-3/4 h-auto'>
                        <div className="bg-white rounded-lg shadow-lg relative flex items-center flex-col gap-4 pb-4">
                            <div className='flex w-full justify-end items-center py-2'>
                                <button onClick={handleCloseSecondModal} className="relative top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl">
                                    <img src="/images/dashboard/x-square.svg" alt="Close Button" />
                                </button>
                            </div>
                            <div className='w-full h-[0.05rem] bg-[#B9B9B9]'></div>
                            <div className='flex flex-row w-full px-10 gap-4 items-center'>
                                <div className='flex '>
                                    <img src="/images/dashboard/exclamation-triangle-fill.svg" alt="Warning" />
                                </div>
                                <div className='flex flex-col text-[#02353C] justify-center gap-2'>
                                    <p className='text-3xl font-bold'>Update the selected donation?</p>
                                    <p className='text-lg font-semibold'>You can still change the status later on.</p>
                                </div>
                            </div>
                            <div className='flex gap-4 font-semibold'>
                                <button onClick={handleCloseSecondModal} className='mt-4 px-6 py-2 bg-white border hover:border-[#188290] text-[#02353C] border-[#02353C] hover:text-[#188290] rounded-lg'>
                                    Cancel
                                </button>
                                <button onClick={handleSubmitChanges} className='mt-4 px-6 py-2 bg-[#188290] hover:bg-[#02353C] text-white rounded-lg'>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoneyReceived;