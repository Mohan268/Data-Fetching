function fetchApiData(apiUrl, timeout) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			fetch(apiUrl)
				.then(response => response.json())
				.then(data => {
					resolve(data);
				})
				.catch(error => {
					reject(error);
				});
		}, timeout);
	});
}

function displayDataInTable(data) {
	const tableRow = document.createElement('tr');
	const api1Data = data[0].id;
	const api2Data = data[1].title;
	const api3Data = data[2].body ? 'Completed' : 'Not Completed';
	tableRow.innerHTML = `
		<td>${api1Data}</td>
		<td>${api2Data}</td>
		<td>${api3Data}</td>
	`;
	document.querySelector('table tbody').appendChild(tableRow);
}

document.querySelector('#fetch-data-btn').addEventListener('click', () => {
	fetchApiData('https://dummyjson.com/posts', 1000)
		.then(data => {
			displayDataInTable(data, 0);
			return true;
		})
		.then(() => {
			return fetchApiData('https://dummyjson.com/products', 2000);
		})
		.then(data => {
			displayDataInTable(data, 1);
			return true;
		})
		.then(() => {
			return fetchApiData('https://dummyjson.com/todos', 3000);
		})
		.then(data => {
			displayDataInTable(data, 2);
			return true;
		})
		.catch(error => {
			console.error('error');
		});
});
