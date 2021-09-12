import React, { useEffect, useState } from "react";
import NewsFeedModule from "./newsfeed.module.css";
import CardFeed from "./Components/CardFeed";
const dataNews = {
	status: "ok",
	totalResult: 0,
	articles: [],
};

const endpoint_api = "https://newsapi.org/v2/top-headlines?country=";

export default function NewsFeed() {
	const [news, setNews] = useState(dataNews);
	const [page, setPage] = useState(1);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [country, setCountry] = useState("us");

	// Proses API
	useEffect(() => {
		const getNewsFeed = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${endpoint_api}${country}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}`
				);
				const results = await response.json();

				setNews((currentState) => {
					return {
						...results,
						articles: [...currentState.articles, ...results.articles],
						totalResult: results.totalResult,
						status: results.status,
					};
				});
			} catch (error) {
				setError(true);
			}
			setLoading(false);
		};

		getNewsFeed();
	}, [page, country]);

	const handlerChangeCountry = (e) => {
		setCountry(e.target.value);
		setNews(dataNews);
		setLoading(false);
	};

	return (
		<>
			<header className={NewsFeedModule.container}>
				<p className={NewsFeedModule.createdBy}>
					<a href="https://github.com/riyaraa">@riyaraa</a>
				</p>
				<div className={NewsFeedModule.navbar}>
					<h3>NewsFeed - {country === "us" ? "English" : "Indonesia"}</h3>
				</div>
				<div className={NewsFeedModule.OptionParent}>
					<select
						className={NewsFeedModule.OptionLanguage}
						onChange={handlerChangeCountry}
					>
						<option hidden>{country === "us" && "English"}</option>
						<option value="us">English</option>
						<option value="id">Indonesia</option>
					</select>
				</div>
			</header>

			{/* Card NewsFeed */}
			{isError ? (
				<p>Sedang Gangguan!</p>
			) : (
				<section>
					<div className={NewsFeedModule.container}>
						<div className={NewsFeedModule.parentCard}>
							<CardFeed articles={news} />
						</div>
						{news.articles.length < parseInt(news.totalResults) ? (
							<div style={{ display: "flex", justifyContent: "center" }}>
								<button
									onClick={() => setPage((c) => c + 1)}
									disabled={isLoading}
									className={NewsFeedModule.buttonLoadMore}
								>
									{isLoading ? "Loading..." : "Load More"}
								</button>
							</div>
						) : null}
					</div>
				</section>
			)}
		</>
	);
}
