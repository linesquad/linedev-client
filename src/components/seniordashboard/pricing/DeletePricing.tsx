import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useDeletePricing } from '../../../hooks/pricing/useDeletePricing';

function DeletePricing({ id }: { id: string }) {
  const { mutate: deletePricing, isPending } = useDeletePricing();
  const handleDelete = (id: string) => {
    deletePricing(id);
  }
  return (
    <div>
      <button onClick={() => handleDelete(id)} className='text-red-500'> 
        <FaTrash />
      </button>
      {isPending && <span>
        <FaSpinner />
      </span>}
    </div>
  )
}

export default DeletePricing