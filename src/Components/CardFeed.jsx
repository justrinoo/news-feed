import React from "react";
import NewsFeedModule from "../newsfeed.module.css";
export default function CardFeed(props) {
	const data = props.articles;
	return (
		<>
			{data.articles.length > 0 ? (
				data.articles.map((article, idx) => (
					<article className={NewsFeedModule.card} key={idx}>
						<img src={article.urlToImage} alt={article.author} width="100%" />
						<h3 className={NewsFeedModule.cardText}>{article.title}</h3>
						<p className={NewsFeedModule.cardTextDescription}>
							{article.description}
						</p>
					</article>
				))
			) : (
				<p>Loading...</p>
			)}

			{/* <Button loading={isLoading}>Load More</Button> */}
		</>
	);
}
