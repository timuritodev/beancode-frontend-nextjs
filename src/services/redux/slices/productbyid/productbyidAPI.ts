import { API_BASE_URL } from '../../../../../src/utils/constants';
import { IProduct } from '../../../../types/Product.types';

const checkRes = (res: Response) => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(res);
	}
};

export const fetchData = (url: string, method: string, token?: string) => {
	return fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(!!token && { Authorization: `Token ${token}` }),
		},
	}).then((res) => checkRes(res));
};

export const getProductbyid = (productId: number): Promise<IProduct> => {
	return fetchData(`${API_BASE_URL}/products/${productId}`, 'GET');
};
