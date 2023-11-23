import Demo from "./components/userMenu.tsx";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="navbar">
        <Demo />
      </div>
      <div className="landingpage"></div>
      <div className="footer"></div>
    </main>
  );
}
