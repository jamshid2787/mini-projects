import express from 'express';
import { products } from './constants';
import { IEntity } from './types';
import { faker } from '@faker-js/faker';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res) => {
	res.send({ data: products, message: null, success: true });
});

app.get('/api/products/:productID', (req, res) => {
	const { productID } = req.params;

	const productIdx = products.findIndex((product) => product.id === productID);

	if (productIdx === -1)
		return res
			.status(404)
			.send({ data: null, message: `Not found todo with id ${productID}`, success: false });

	res.send({ data: products[productIdx], message: null, success: true });
});

app.delete('/api/products/:productID', (req, res) => {
	const { productID } = req.params;

	const productIdx = products.findIndex((product) => product.id === productID);

	if (productIdx === -1)
		return res
			.status(404)
			.send({ data: null, message: `Not found product with id ${productID}`, success: false });

	const [deletedProduct] = products.splice(productIdx, 1);
	res.send({ data: deletedProduct, message: `Delete product with id ${productID}`, success: true });
});

app.post('/api/products', (req, res) => {
	const product: IEntity.Product = {
		id: faker.string.uuid(),
		...req.body,
	};

	products.unshift(product);
	res.send({ data: product, message: 'Successfully created todo', success: true });
});

app.put('/api/products/:productID', (req, res) => {
	const { productID } = req.params;

	const productIdx = products.findIndex((product) => product.id === productID);

	if (productIdx === -1)
		return res
			.status(404)
			.send({ data: null, message: `Not found todo with id ${productID}`, success: false });

	products[productIdx] = { ...products[productIdx], ...req.body };
	res.send({ data: products[productIdx], message: 'Successfully updated product', success: true });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

/**
 * Standard Response
 * res.data = {
 *   data: [{}],
 *   message: string,
 *   success: boolean
 * }
 *
 *
 */
