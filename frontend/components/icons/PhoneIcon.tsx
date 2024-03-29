import React from 'react';

export default function PhoneIcon({className, ...props}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 21 21"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20.084 3.325L17.288.533a1.806 1.806 0 00-2.562 0l-3.01 3.005a1.812 1.812 0 000 2.567l2.351 2.354A10.64 10.64 0 0111.8 11.8a10.664 10.664 0 01-3.339 2.273L6.108 11.72a1.806 1.806 0 00-2.562 0L.533 14.724a1.811 1.811 0 000 2.567l2.793 2.793a3.143 3.143 0 002.21.916c.17 0 .336-.013.504-.042 3.476-.572 6.925-2.423 9.71-5.205 2.783-2.787 4.63-6.236 5.208-9.714a3.129 3.129 0 00-.874-2.714zm-.987 2.402c-.512 3.095-2.176 6.181-4.683 8.688-2.507 2.506-5.591 4.17-8.686 4.682a1.235 1.235 0 01-1.071-.346l-2.743-2.743 2.908-2.91 3.145 3.149.024.023.567-.21a12.635 12.635 0 007.5-7.5l.21-.568-3.172-3.168 2.909-2.91 2.743 2.742c.283.284.415.683.349 1.071z"
      ></path>
    </svg>
  );
}