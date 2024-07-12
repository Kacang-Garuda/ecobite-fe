import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ReasonInput = ({
  reason,
  setReason,
  setIsConfirmation,
}: {
  reason: string
  setReason: React.Dispatch<React.SetStateAction<string>>
  setIsConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Application Details</DialogTitle>
      </DialogHeader>
      <label htmlFor="reason">
        What Motivates You to Join This Volunteer Event?
      </label>
      <div className="relative">
        <textarea
          name="reason"
          id="reason"
          className="w-full px-4 py-2 border border-[#188290] rounded-[8px]"
          rows={6}
          placeholder="Please share why you are interested in volunteering for this event. You can discuss any personal experiences, skills you hope to offer or develop, or how this event aligns with your values. Max 250 words"
          value={reason}
          onChange={(e) =>
            e.target.value.length > 250 ? undefined : setReason(e.target.value)
          }
        />
        <span className="absolute bottom-2 right-2">{reason.length}/250</span>
      </div>
      <DialogFooter className="!justify-center">
        <button
          type="button"
          className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg 
                ${reason.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
          disabled={reason.length === 0}
          onClick={() =>
            reason.length > 0 ? setIsConfirmation(true) : undefined
          }
        >
          Confirm
        </button>
      </DialogFooter>
    </>
  )
}

const Confirmation = ({
  reason,
  eventId,
  isLoading,
  setIsLoading,
  setIsConfirmation,
}: {
  reason: string
  eventId: string
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()

  async function handleConfirm() {
    setIsLoading(true)

    try {
      const token = Cookies.get('token')
      if (token) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/event/regist`,
          { reason, eventId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        toast.success('Berhasil daftar volunteer')
        router.replace('/')
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogDescription>
          Are you sure all the data is correct?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="!justify-start">
        <button
          type="button"
          className={`px-6 py-3 w-max flex self-center font-semibold text-white rounded-lg 
                ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#188290] hover:bg-[#02353C]'}`}
          disabled={isLoading}
          onClick={handleConfirm}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : 'Yes'}
        </button>
        <button
          className={`px-6 py-3 w-max flex self-center font-semibold text-[#188290] rounded-lg border-2 border-[#188290] bg-transparent hover:bg-gray-200`}
          disabled={isLoading}
          onClick={() => setIsConfirmation(false)}
        >
          No
        </button>
      </DialogFooter>
    </>
  )
}

const DialogApply = ({
  open,
  setOpen,
  eventId,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  eventId: string
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmation, setIsConfirmation] = useState(false)
  const [reason, setReason] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {isConfirmation ? (
          <Confirmation
            reason={reason}
            eventId={eventId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setIsConfirmation={setIsConfirmation}
          />
        ) : (
          <ReasonInput
            reason={reason}
            setReason={setReason}
            setIsConfirmation={setIsConfirmation}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogApply
