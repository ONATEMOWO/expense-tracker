// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//   return <SignIn />
// }
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
