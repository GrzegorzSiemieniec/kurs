import Link from "next/link";
import Icon from "./img/languageCourse.png";
import Image from "next/image";
import Form from "./components/registerForm.tsx";
import db from "./db.ts";

export default function Home() {
  return (
    <main className="">
      <div className="navbar bg-[#CBF1F5] flex h-fit">
        <Link href="/dashboard">
          <Image
            src={Icon}
            alt="Ikona"
            width={110}
            height={110}
            className="ml-10"
          />
        </Link>
      </div>
      <div className="landingpage bg-[#A6E3E9] h-fit pb-10 pt-10">
        <Form />
      </div>
      <div className="footer h-fit bg-[#71C9CE]">jdjdjd</div>
    </main>
  );
}
