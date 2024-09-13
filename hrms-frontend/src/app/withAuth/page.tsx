import withAuth from "@/authComponent/authentication";

const WithAuthComponent = () => {
  return (
    <main className=" h-screen flex justify-center items-center">
      <p> With Auth Component</p>
    </main>
  );
};


export default withAuth(WithAuthComponent);