import React from 'react';

interface MintButtonProps {
  className?: string;
}

export default function MintButton({ className }: MintButtonProps) {
  return (
    <div>
      <div>
        <button
          type="button"
          className={`bg-figma-100 text-figma-300 py-2 px-3 lg:py-2 lg:px-4 rounded-lg ${className}`}
        >
          Mint Your NFT!
        </button>
      </div>
    </div>
  );
}
