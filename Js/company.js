// getting company name symbol from the url
const urlParams = new URLSearchParams(window.location.search);
const companySymbol = urlParams.get("symbol");
const apiKey = "6e5aea1564ccd40d2d879a6063cf4791";

//elements selectors
const pageContainer = document.querySelector("#pageContainer");
const companyLoading = document.querySelector("#companyLoading");
const stockName = document.querySelector("#stockName");
const stockPrice = document.querySelector("#stockPrice");
const stockImg = document.querySelector("#stockImg");
const stockDescription = document.querySelector("#stockDescription");
const changesPercentage = document.querySelector("#changesPercentage");
const marketCap = document.querySelector("#marketCap");
const industry = document.querySelector("#industry");
const website = document.querySelector("#website");

const stockURL =
	"https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/";

const stockHistoryURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;

async function getStockFullDetails() {
	let response = await fetch(stockURL + companySymbol);
	let data = await response.json();
	return data;
}

const companyProfileMaker = async () => {
	let data = await getStockFullDetails();
	stockName.innerHTML = data.profile.companyName;
	data.profile.changesPercentage.includes("-")
		? (changesPercentage.style.color = "red")
		: (changesPercentage.style.color = "green");
	stockPrice.innerHTML = data.profile.price + "$";
	changesPercentage.innerHTML = data.profile.changesPercentage;
	stockImg.src = data.profile.image;
	stockDescription.innerHTML = data.profile.description;
	marketCap.innerHTML = "Market Cap: " + data.profile.mktCap;
	industry.innerHTML = "Industry: " + data.profile.industry;
	website.href = data.profile.website;
	website.innerHTML = data.profile.website;
};

async function getStockHistoryDetails() {
	let response = await fetch(stockHistoryURL);
	let historyData = await response.json();
	return historyData;
}

const dateArr = [];
const closeArr = [];

const historyChartMaker = async () => {
	const res = await getStockHistoryDetails();
	let history = res.historical;
	history.reverse();
	history.map(e => {
		dateArr.push(e.date);
		closeArr.push(e.close);
	});
	const labels = dateArr;
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Stock Price Changes",
				backgroundColor: "rgb(51, 133, 255)",
				borderColor: "rgb(26, 117, 255)",
				data: closeArr,
				pointRadius: 0,
				fill: true,
			},
		],
	};
	const config = {
		type: "line",
		data,
		options: {},
	};
	let myChart = new Chart(document.getElementById("myChart"), config);
	companyLoading.style.display = "none";
	pageContainer.style.display = "block";
};

historyChartMaker();
companyProfileMaker();
getStockHistoryDetails();
