class SearchForm {
	constructor(element) {
		//elements selectors
		const form = document.createElement("form");
		form.id = "formMamash";

		const elementsRapper = document.createElement("div");
		elementsRapper.classList.add("input-group", "mt-3");
		form.appendChild(elementsRapper);

		const searchInput = document.createElement("input");
		searchInput.classList.add("form-control", "rounded");
		searchInput.id = "searchInput";
		searchInput.type = "search";
		searchInput.placeholder = "   Symbol, eg. AAPL";
		elementsRapper.appendChild(searchInput);

		const button = document.createElement("button");
		button.classList.add("btn", "btn-primary");
		button.type = "submit";
		button.innerHTML = "Search &nbsp;";
		elementsRapper.appendChild(button);

		const span = document.createElement("span");
		span.classList.add("spinner-border", "spinner-border-sm", "d-none");
		span.id = "searchbarSpinner";
		span.role = "status";
		span.setAttribute("aria-hidden", "true");
		button.appendChild(span);

		form.addEventListener("submit", e => {
			e.preventDefault();
			this.callbackFunction(searchInput.value);
		});

		element.appendChild(form);
	}

	onSearch(companies) {
		this.callbackFunction = companies;
	}
}
