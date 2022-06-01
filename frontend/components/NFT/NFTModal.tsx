import React from 'react';
import WholeToken from '../../models/WholeToken';
import Modal from '../modal/Modal';

interface NFTModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: WholeToken;
}

export default function NFTModal({ setOpen, isOpen, data }: NFTModalProps) {
  return (
    <Modal
      setOpen={setOpen}
      className="w-full bg-gray-200 p-12"
      isOpen={isOpen}
    >
      <div className="justify-center w-full mb-10">
        <img src={data?.token?.metadata?.media} alt="" className="w-96" />
        <div className="flex justify-between">
          <div>
            <h2>{data?.token?.metadata?.title}</h2>

            <div>
              <h2>
                Collection:{' '}
                {JSON.parse(data.token?.metadata?.extra)?.collection || '-'}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
