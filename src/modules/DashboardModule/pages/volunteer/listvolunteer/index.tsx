import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Event } from '@/modules/AuthenticationModule/interface';
import TableRowVolunteer from '@/components/elements/DashboardElements/TableRowVolunteer';


interface ListVolunteerProps {
    id: string;
}

const ListVolunteer: React.FC<ListVolunteerProps> = ({id}) => {
    const [event, setEvent] = useState<Event | null>(null)
    const [trigger, setTrigger] = useState(false)

    const handleTrigger = () => {
        setTrigger((prev) => !prev)
    }
    
    useEffect( () => {
        const fetchUserData = async () => {
        const token = Cookies.get('token')
        if (token) {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('token')}`,
                        },
                    }
                );
                setEvent(response.data.data)
                handleTrigger()
            } catch (error) {
                console.error('Failed to fetch user data', error)
            }
        }
    }
    fetchUserData()
    }, [trigger])
  return (
    <div className='flex w-full flex-col py-10 px-8 gap-6'>
                    <div className='flex justify-center items-center'>
                        <div className='flex flex-col items-center'>
                            <p className='text-3xl font-bold text-[#02353C]'>List Volunteer</p>
                            <p>{event?.title}</p>
                        </div>
                    </div>
                    <Table className='rounded-lg shadow-md'>
                        <TableHeader className='bg-[#E6F1F3] text-lg overflow-hidden'>
                            <TableRow>
                                <TableHead className='text-[#188290] font-bold'>Status</TableHead>
                                <TableHead className='text-[#188290] font-bold'>Name</TableHead>
                                <TableHead className='text-[#188290] font-bold'>Email</TableHead>
                                <TableHead className='text-[#188290] font-bold'>Phone</TableHead>
                                <TableHead className='text-[#188290] font-bold w-max-sm'>Motivation Letter</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {event && event?.registeredUsers.map((value) => 
                            <TableRowVolunteer 
                                id={value.id}
                                image={value.user.profileImage}
                                name={value.user.name}
                                email={value.userEmail}
                                phone={value.user.phone}
                                status={value.status}
                                reason={value.reason}
                                handleTrigger={handleTrigger}
                            />) }
                        </TableBody>
                    </Table>
                </div>
  )
}

export default ListVolunteer