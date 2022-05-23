import React from 'react';
import { useNear } from '../../hooks/useNear';
import useUser from '../../hooks/useUser';
import Modal from '../modal/Modal';

interface AuthorModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LogOutModal({ setOpen, isOpen }: AuthorModalProps) {
  const [user, setUser] = useUser();
  const [nearContext] = useNear();
  const logOut = async () => {
    await setUser('');
    await nearContext.walletConnection.signOut();
    setOpen(false);
  };
  return (
    <Modal setOpen={setOpen} className="w-5/6 bg-gray-200 p-12" isOpen={isOpen}>
      <div className="justify-center w-full mb-10">
        <h2 className="text-lg text-center">Log Out?</h2>
        <div className="flex justify-around px-10 mt-3">
          <button
            className="bg-figma-100 text-figma-300 rounded px-5 py-1"
            onClick={() => logOut()}
          >
            Yes
          </button>
          <button
            className="bg-figma-100 text-figma-300 rounded px-5 py-1"
            onClick={() => setOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}
