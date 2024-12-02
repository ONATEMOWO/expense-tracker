import { Button } from "../../components/ui/button"; // go up two levels
import Image from "next/image";
import React from "react";
import {currentUser} from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';

const Header = async() => {
    const user = await currentUser()
  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <Image src={"./logoipsum-245.svg"} alt="logo" width={55} height={60} />
      {!user ?<Link href={'/sign-in'}><Button>Get Started</Button></Link> : <UserButton/>}
      
    </div>
  );
};

export default Header;
