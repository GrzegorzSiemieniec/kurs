import Link from "next/link";
import Demo from "../components/userMenu.tsx";
import Icon from "../img/languageCourse.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <div className="navbar bg-[#CBF1F5] flex h-fit">
        <Link href="/">
          <Image
            src={Icon}
            alt="Ikona"
            width={110}
            height={110}
            className="ml-10"
          />
        </Link>
        <div className="ml-auto mt-auto mb-auto pr-10">
          <Demo />
        </div>
      </div>
      <div className="landingpage bg-[#A6E3E9] h-fit">jdjd</div>
      <div className="footer h-fit bg-[#71C9CE]">jdjdjd</div>
    </main>
  );
}
