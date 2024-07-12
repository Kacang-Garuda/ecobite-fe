import VolunteerDetail from '@/modules/VolunteerModule/pages/Detail'
import React from 'react'

const VolunteeringDetailPage = ({ params }: { params: { id: string } }) => {
  return <VolunteerDetail params={params} />
}

export default VolunteeringDetailPage
