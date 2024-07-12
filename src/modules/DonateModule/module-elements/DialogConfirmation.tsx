import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LoaderCircle } from 'lucide-react'
import React from 'react'

const DialogConfirmation = ({
  open,
  setOpen,
  isLoading,
  handleConfirm,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  handleConfirm: () => void
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
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
            onClick={() => setOpen(false)}
          >
            No
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirmation
