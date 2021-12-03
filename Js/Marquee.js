class Marquee {
	constructor(element) {
		this.element = element;
	}

	async getMarqueeResults() {
		const response = await fetch(
			"https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/etf/list"
		);
		const data = await response.json();
		return data;
	}

	async displayMarquee() {
		const marqueeResults = await this.getMarqueeResults();

		for (let i = 200; i < marqueeResults.length; i--) {
			let stock = marqueeResults[i];
			let d = document.createElement("div");
			d.classList.add("marquee-box");
			d.innerHTML = `<p>${stock.symbol}</p><p class="price-p">$${stock.price}</p>`;
			this.element.appendChild(d);
		}
	}
}
