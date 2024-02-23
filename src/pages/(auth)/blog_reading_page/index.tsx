import NavBar2 from "~/components/shared/navbar-style-2";
import Filter from "~/components/blog_reading_page/filter";
import StaffPick from "~/components/blog_reading_page/staff-pick";
import RecommendedTopic from "~/components/blog_reading_page/recommended";
import WhoToFollow from "~/components/blog_reading_page/who-to-follow";
import BlogList from "~/components/blog_reading_page/blog-list";
const BlogReadingPage = () => {
  return (
    <div>
      <NavBar2></NavBar2>
      <div className="mx-auto flex max-w-screen-xl flex-row justify-between space-x-10">
        <div className="flex flex-col px-20">
          <Filter></Filter>
          <BlogList></BlogList>
        </div>

        <div className="overflow-none border-l">
          <StaffPick></StaffPick>
          <RecommendedTopic></RecommendedTopic>
          <WhoToFollow></WhoToFollow>
        </div>
      </div>
    </div>
  );
};
export default BlogReadingPage;
