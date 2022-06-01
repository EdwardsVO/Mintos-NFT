import React from 'react';

export default function EmailIcon({className, ...props}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 25 20"
      {...props}
    >
      <path
        fill="currentColor"
        d="M24.107 0H.893A.9.9 0 000 .91v18.18a.9.9 0 00.893.91h23.214a.9.9 0 00.893-.91V.91a.9.9 0 00-.893-.91zm-1.116 3.148v14.806H2.01V3.149l-.77-.611 1.096-1.435 1.195.946h17.943l1.194-.946 1.097 1.435-.773.61zm-1.518-1.103L12.5 9.148 3.527 2.045 2.333 1.1 1.236 2.534l.77.61 9.531 7.546a1.544 1.544 0 001.917 0l9.537-7.542.77-.611-1.096-1.435-1.192.943z"
      ></path>
    </svg>
  );
}