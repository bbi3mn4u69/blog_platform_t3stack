// import shared component
import NavBar from "~/components/shared/navbar-style-1";
import Footer from "~/components/shared/footer";
// import page element
import Hero from "~/components/landing_page/hero";
import Recommened from "~/components/landing_page/recommended";
import Blog from "~/components/landing_page/blog";
import Discover from "~/components/landing_page/discover";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <section>
      <NavBar></NavBar>
      <Hero></Hero>
      <Recommened></Recommened>
      <div className=" mx-auto flex max-w-screen-xl flex-row justify-between space-x-10">
      <Blog></Blog>
        <div>
          <Discover></Discover>
          <Footer></Footer>
        </div>
      </div>
    </section>
  );
}
