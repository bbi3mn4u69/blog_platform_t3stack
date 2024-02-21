
import NavBar from "~/components/writting_page/navbar";
import  Test  from "~/components/writting_page/test";
import FloatingAction from "~/components/writting_page/floating-action";
import PublishButtonContext from "~/components/writting_page/publish-button-context";
import FloatingActionContextProvider from "~/components/writting_page/floating-action-context";

const Writing_page = () => {
  return (
    <div>
      <PublishButtonContext>
        <FloatingActionContextProvider>
          <NavBar></NavBar>
          <Test></Test>
          <FloatingAction></FloatingAction>
        </FloatingActionContextProvider>
      </PublishButtonContext>
    </div>
  );
};
export default Writing_page;
