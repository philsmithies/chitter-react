import { connectToDatabase } from "../util/mongodb";
export default function Tweets({ tweets }) {
  return (
    <div>
      <h1>Top 20 Tweets of All Time</h1>
      <ul>
        {tweets.map((tweet, key) => (
          <li key={key}>
            <h2>{tweet.text}</h2>
            <p>Created at:{tweet.createdAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const tweets = await db.collection("tweets").find({}).limit(20).toArray();
  return {
    props: {
      tweets: JSON.parse(JSON.stringify(tweets)),
    },
  };
}
