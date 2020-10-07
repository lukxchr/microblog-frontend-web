import Head from "next/head";
import { MainLayout } from "../components/MainLayout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";
import { CreatePostForm } from "../components/CreatePostForm";
//import styles from "../styles/Home.module.css";

function Home() {
  const [{ data }] = usePostsQuery();
  const { setWarningAlert, setErrorAlert, setSuccessAlert } = useAlert();

  //console.log(data);
  return (
    <div>
      <MainLayout header="Home">
        <CreatePostForm></CreatePostForm>
        <div className="py-4 space-y-4 space-x-4">
          <button
            className="bg-red-800"
            onClick={() => setErrorAlert("scary error")}
          >
            Show my an error
          </button>
          <button
            className="bg-orange-500"
            onClick={() => setWarningAlert("Ingoreable warning")}
          >
            Show my a warning
          </button>
          <button
            className="bg-green-800"
            onClick={() => setSuccessAlert("GREAT SUCCESS !!!")}
          >
            Great success
          </button>
        </div>
      </MainLayout>
    </div>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
