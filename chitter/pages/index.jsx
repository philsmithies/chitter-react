import Head from "next/head";
import Feed from "../components/Feed";
import TweetModal from "../components/TweetModal";
import clientPromise from "../lib/clientPromise";

export default function Home({ isConnected }) {
  return (
    <div className="bg-red-500 h-screen">
      <p className="">Mongo DB {isConnected}</p>
      <Feed />
      <TweetModal />
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}