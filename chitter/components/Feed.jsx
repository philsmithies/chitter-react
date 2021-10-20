import useSwr from "swr";
import Link from "next/link";
import Tweet from "./Tweet";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Feed() {
  const { data, error } = useSwr("/api/tweets", fetcher);

  console.log(data);

  if (error) return <div>Failed to load Tweets</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((tweet) => (
        <li key={tweet._id}>
          {/* <Link href="/tweet/[id]" as={`/tweet/${tweet._id}`}>
            <a>{`Tweet ${tweet.text}`}</a>
          </Link> */}
          <Tweet
            // key={tweet._id}
            // fullName={tweet.author.fullName}
            // publicId={tweet.author ? tweet.author.publicId : ""}
            // imageUrl={tweet.imageUrl}
            text={tweet.text}
            // username={tweet.author ? tweet.author : ""}
            // createdAt={tweet.createdAt}
          />
        </li>
      ))}
    </ul>
  );
}
