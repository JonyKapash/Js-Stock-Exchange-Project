class SearchResults {
	constructor(element) {
		// this.element = element;
		const searchbarSpinner = document.querySelector("#searchbarSpinner");
		this.ul = document.createElement("ul");
		this.ul.classList.add("list-group", "list-group-flush");
		this.ul.id = "resultList";
		element.appendChild(this.ul);
	}

	showSpinner() {
		searchbarSpinner.classList.remove("d-none");
	}

	hideSpinner() {
		searchbarSpinner.classList.add("d-none");
	}

	clearSearchInput() {
		searchInput.value = "";
	}

	async renderResults(companies) {
		this.showSpinner();
		let response = await fetch(
			`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${companies}&limit=10&exchange=NASDAQ`
		);
		let data = await response.json();

		let lis = "";
		for (let stock of data) {
			const response = await fetch(
				`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stock.symbol}`
			);

			const fullStockData = await response.json();
			let stockProfile = fullStockData.profile;

			stockProfile.changes < 0
				? (this.changesColor = "red")
				: (this.changesColor = "green");

			lis += `<img width="50" src="${stockProfile.image}" alt="stock-img" onerror="this.src='./images/Stocks-icon.png'">
			<a href="./company.html?symbol=${stock.symbol}">
			 ${stockProfile.companyName}.</a>  ${stock.symbol} <span style="color:${this.changesColor};">(${stockProfile.changes})</span> <br><br>`;
		}
		resultList.innerHTML = lis;
		this.hideSpinner();
		this.clearSearchInput();
	}
}
