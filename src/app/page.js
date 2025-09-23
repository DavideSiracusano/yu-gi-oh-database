import Home from "./home/page";

export function generateMetadata() {
  return {
    title: "Home Page",
    description: "Benvenuto nel mio sito Next.js",
  };
}

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
