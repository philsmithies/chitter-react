// import { useState, useEffect } from "react";
// import axios from "axios";
// import Tweet from "./Tweet";

// export default function Feed() {
//   const [allData, setAllData] = useState([]);

//   return (
//     <div className="tweets_feed">
//       <p>Feed here</p>
//       {/* {allData
//         ? allData.map((value, index) => (
//             <Tweet
//               key={index}
//               fullName={value.author.fullName}
//               publicId={value.author ? value.author.publicId : ""}
//               imageUrl={value.imageUrl}
//               text={value.text}
//               username={value.author ? value.author.username : ""}
//               createdAt={value.createdAt}
//             />
//           ))
//         : ""} */}
//     </div>
//   );
// }

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
            key={tweet._id}
            fullName={tweet.author.fullName}
            publicId={tweet.author ? tweet.author.publicId : ""}
            imageUrl={tweet.imageUrl}
            text={tweet.text}
            username={tweet.author ? tweet.author : ""}
            createdAt={tweet.createdAt}
          />
        </li>
      ))}
    </ul>
  );
}
