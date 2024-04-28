import React, { Component, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
	id: number;
	img: string;
	name: string;
	price: number;
}

interface AppState {
	productList: Product[];
	newProduct: {
		img: string;
		name: string;
		price: string;
	};
	editProductId: string;
	edit: boolean;
}

export default class Products extends Component<{}, AppState> {
	state: AppState = {
		productList: [],
		newProduct: {
			img: '',
			name: '',
			price: '',
		},
		editProductId: '',
		edit: true,
	};

	componentDidMount(): void {
		fetch('http://localhost:4000/api/products')
			.then((response) => response.json())
			.then((data) => {
				this.setState({ productList: data.data });
			});
	}

	handleDelete = (id: number): void => {
		fetch(`http://localhost:4000/api/products/${id}`, {
			method: 'DELETE',
		});
		const deleteProduct = this.state.productList.filter((item) => item.id !== id);
		this.setState({ productList: deleteProduct });
	};

	handleUpdate = (): void => {
		const { editProductId, newProduct } = this.state;
		if (editProductId) {
			fetch(`http://localhost:4000/api/products/${editProductId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newProduct),
			})
				.then((response) => response.json())
				.then((updatedProduct) => {
					const updatedList = this.state.productList.map((product) =>
						product.id === +editProductId ? updatedProduct : product
					);
					this.setState({
						productList: updatedList,
						newProduct: {
							img: '',
							name: '',
							price: '',
						},
						editProductId: '',
					});
				})
				.catch((error) => {
					console.error('Error updating product:', error);
				});
		}
	};

	handleEdit = (id: number): void => {
		const productToEdit = this.state.productList.find((item) => item.id === id);
		if (productToEdit) {
			this.setState({
				newProduct: {
					img: productToEdit.img,
					name: productToEdit.name,
					price: productToEdit.price.toString(), // Convert price to string
				},
				editProductId: `{id}`,
			});
		}
	};

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			newProduct: {
				...prevState.newProduct,
				[name]: value,
			},
		}));
	};

	handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		// e.preventDefault();
		fetch('http://localhost:4000/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state.newProduct),
		})
			.then((response) => response.json())
			.then((data) => {
				this.setState((prevState) => ({
					productList: [...prevState.productList, data],
					newProduct: {
						img: '',
						name: '',
						price: '',
					},
				}));
			})
			.catch((error) => {
				console.error('Error adding product:', error);
			});
	};

	render() {
		const { productList, newProduct, edit } = this.state;
		return (
			<div className="container">
				<div className="menu">
					<img
						className="logo"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABLFBMVEX+/v7////lLSz/zQH8///+/f/lLSv+/vz/ywDlLS7nLCz/zgDlLin8/v//9fb///z26eneFRnhWF7/yAD///jfAADywb/lHyHcAADllpHz0tHmmprlJybiNjvz1tbogn/z18vbVlTkIyD7+NnlGRb+/urmAAD97bXywbjusKny2NLgXlr97Kz99s34zgD72lvpk5j+/fD86Zz610b14OHrvb7YKCfusKfna2756+Xtqansw8X76Y7844H93Gr63nP388T921f98tb72Tn76Z/21Br43Vn754j977H71CfgVEXsrrHcPzfdREnniojkgHXohorhcHXz5XT934LqdnDkn5flZWj5+tjYRkvYFSvyy8HcQ0DjbGLpcXviSVXlYlrv4UjXgH/TUlHsnaVaOixrAAAav0lEQVR4nO1cDVva2LZmwc4nHzFCCGqEMW6wolJRpCJatbWtjtXqGet0tGfmntP//x/uWmsniBWn1XautjfvY6tAEvabtfb63DupVIIECRIkSJAgQYIECRIkSJAgQYIECRIkSJAgQYIECRIkSJAgQYIECRIkSJAgQYIECRIkSPD/HBBBCADtoQfzfaFpQgNn9sX+5tb2c8T21ub+Ut0ATRjGQ4/tu0CD9s7KastkZBD4q5UxW7srL0oADz26b4YQ7cXdjJnJZrOZGyhmXs+VxI9M0hBi7qmiN5IhSjPT2n7x405LcPYOiuYIYtdZFl/ua/n8DzgjhbPXyma+SJBJvtoHcOAHIwlzByap5kA7lZHJxLYmk82YA/rZ7MslAOMHMq2aqO8WM0Mzz8y8erqy/6Jeb7fb9Xp9Z29zt8UsB8hut4Xz4zCElRbKJx5/Mft8bhatqshrWl6gbyS3r6Vm915nXl0xNFtzP4pVRf/31MzGGlg0n86VMI7RkCJoGkc0QBrpCJEqLa4WMwNFLm6XfgijmoedFkpEMTSzm23y6pqW0mAYasoh49ntWFlx1r6chfxDj//L0PbJAXL4YrY2S6SRkNIMolXoVPtr5X61U2CWdDT+am9FFpcM09JDD/+LyIs3xcHc2m4PZFYoTyx05QDdhakykhd5IirqT814Mpr7j9xp5MVW5BAyxYNZMBS9sY1fpfSDXC6dTuu6nrb0XBi6cuEQZWmg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"
						alt=""
					/>
					<form className="input-group" onSubmit={this.handleSubmit}>
						<input
							className="form-control"
							required
							type="text"
							name="img"
							placeholder="Image URL"
							value={newProduct.img}
							onChange={this.handleInputChange}
						/>
						<input
							className="form-control"
							required
							type="text"
							name="name"
							placeholder="Product Name"
							value={newProduct.name}
							onChange={this.handleInputChange}
						/>
						<input
							className="form-control"
							required
							type="text"
							name="price"
							placeholder="Price"
							value={newProduct.price}
							onChange={this.handleInputChange}
						/>
						<button type="submit" className="btn btn-primary">
							Add Food
						</button>
					</form>
				</div>
				{edit ? (
					<div className={'boxes'}>
						{productList.map((item: Product) => (
							<div className="box" key={item.id}>
								<img src={item.img} alt="Error img URL" />
								<div className="box-center">
									<h5>{item.name}</h5>
									<p>Price {item.price}</p>
									<button className="btn btn-danger" onClick={() => this.handleDelete(item.id)}>
										Delete
									</button>
									<button
										className="btn btn-warning"
										onClick={() => {
											this.setState({
												edit: false,
											});
										}}
									>
										Edit
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<button
						onClick={() => {
							this.setState({
								edit: true,
							});
						}}
					>
						Close
					</button>
				)}
			</div>
		);
	}
}
