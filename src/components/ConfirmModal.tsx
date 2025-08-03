import { MdWarning } from 'react-icons/md'
import ButtonCard from '@components/ButtonCard'

type ConfirmModalProps = {
  isOpen: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="flex items-center mb-4">
          <MdWarning className="text-yellow-500 text-3xl mr-2" />
          <h2 className="text-lg font-semibold">{title || 'Confirm Action'}</h2>
        </div>
        <p className="mb-6">{message || 'Are you sure you want to proceed?'}</p>
        <div className="flex justify-end space-x-2">
          <ButtonCard
            onClick={onCancel}
            color="primary"
            size="small"
            className="px-4 py-2"
          >
            Cancel
          </ButtonCard>
          <ButtonCard
            onClick={onConfirm}
            color="danger"
            size="small"
            className="px-4 py-2"
          >
            Delete
          </ButtonCard>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal