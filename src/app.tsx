import React, { Component } from 'react';
import Products from 'products';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

interface AppState {
	productList: [];
}

export default class App extends Component {
	state: AppState = {
		productList: [],
	};
	render() {
		return (
			<>
				<Products />

			</>
		);
	}
}
