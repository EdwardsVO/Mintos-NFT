import React from 'react';
import Link from 'next/link';
import Fade from 'react-reveal';

export default function FrequentQuestionSection() {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');

  //question answers
  const q1 =  "R. The first marketplace out of this world, and the easiest to use"
  const q2 = "R. You only need to go to the Mint page, fill the form with title, description and all the data related to your token and place your art"
  const q3 = "R. Artist, Designers, Ilustrators and all those that wants to take advantage of their talent"
  const q4 = "R. The reserve storage deposit is a cover for the space that your NFT will need for be sold within the marketplace, you can always withdraw it"
  const q5 = "R. Once created your NFT it will be appear in 'MyNFTs' page and in your NEAR Wallet "
  const q6 = "R. The only attributes you would change once mintend your NFT and putted on sale is the price or if ypu want to cancel the token sell"
  const q7 = "R. Go to 'Gallery' page explore and click the NFT you want, after click the buy button and accept the transaction within your NEAR Wallet"
  const q8 = "R. You can sell all NFTs you want ! There is no limit"
  const q9 = "R. Firstly you need to go to 'MyNFTs' page, reserve storage with a small deposit and once minted your NFT click on the 'Put on Sale' button"
  const q10 = "R. The minimun deposit you need to do to cover ONE (1) NFT sale is 0.01 NEARs. If you want to cover two sales it would be 0.02 NEARs, and so on"

  return (
    <div className={` ${open ? 'md:h-[500px] h-[400px]': 'md:h-[500px] h-[300px]'}  w-full flex flex-col items-center justify-center`}>
      <p className="text-blue-500 font-light md:text-4xl text-2xl">Frequently Asked Questions</p>
      <div className="flex flex-row md:gap-x-20 gap-x-5 md:mt-20 mt-10">
        <Fade left>
          <ul className="text-gray-200 underline list-disc md:text-xl text-xs cursor-pointer font-light md:ml-0 ml-5 flex flex-col ">
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q1)}}><li>What is Mintos NFT?</li></button>
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q2)}}><li>How can I mint my first NFT?</li></button>
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q3)}}><li>Who can create an NFT?</li></button>
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q9)}}><li>How can I sell my NFT?</li></button>
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q4)}}><li>What is 'Reserved Storage'?</li></button>
          </ul>
        </Fade>
        <Fade right>
          <ul className="text-gray-200 underline list-disc md:text-xl text-xs cursor-pointer font-light">
          <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q10)}}><li>What's the minimum amount for Reserve Storage for sell an NFT ?</li></button>
          <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q8)}}><li>What's the minimum amount for Reserve Storage?</li></button>             
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q5)}}><li>What is the next step after creating my NFT?</li></button>
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q6)}}><li>Can I update my NFT information?</li></button>
            <button className="underline font-light flex justify-start text-left" onClick={()=>{setOpen(true); setText(q7)}}><li>How can I buy an NFT ?</li></button>
            
          </ul>
        </Fade>
      </div>
      {
        open ? (
          <Fade bottom>
            <div className="md:h-32 h-28 md:w-5/12 w-10/12 border-blue-300 border-2 rounded-xl drop-shadow-3xl mt-7 p-5 flex items-center">
              <p className="font-light text-white md:text-base text-sm">{text}</p>
            </div>
          </Fade>
        ):(null)
      }
    </div>
  );
}