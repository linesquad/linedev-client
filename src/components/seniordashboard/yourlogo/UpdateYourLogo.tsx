
import Modal from '../../modal/Modal'
import { useUpdateYourLogo } from '../../../hooks/yourlogo/useUpdateYourLogo';
import { useState } from 'react';

function UpdateYourLogo({ id, setShowUpdateModal }: { id: string, setShowUpdateModal: (show: boolean) => void } ) {
  const { mutate: updateYourLogo } = useUpdateYourLogo();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  console.log(id);
  return (
      <Modal> 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="flex flex-col justify-center items-center gap-8 p-8 bg-[#0E0C15] text-white rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Your Logo</h2>
              <button
                onClick={() => {setShowUpdateModal(false)}}
                className="text-gray-400 hover:text-white transition duration-300"
                >
                ✕
              </button>
            </div>
            <input defaultValue={name} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input defaultValue={image} type="file" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
            <button onClick={() => updateYourLogo({ id, name, image })}>Update</button>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Update Your Logo</h2>
            </div>
          </div>
        </div>
      </Modal>
  )
}

export default UpdateYourLogo