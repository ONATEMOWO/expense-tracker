// import { SignUp } from '@clerk/nextjs'

// export default function Page() {
//   return <SignUp />
// }
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <SignUp />
    </div>
  );
}
