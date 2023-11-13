import { Types } from 'mongoose';

export interface AuthUser {
	email: string;
	code: string;
	expires: Date;
	userID: string;
}

export interface UserInterface {
	id: string;
	email: string;
	name: string;
	surname: string;
	phone: { areaCode: string; number: number };
	identification: { type: string; number: string };
	address: AddressInterface;
}

export interface UserWithIDInterface extends UserInterface {
	_id: Types.ObjectId;
}

export interface OrderInterface {
	userID: string;
	productsIDs: string[];
	productDetails: {};
	status: string;
}

export interface AddressInterface {
	zipCode: string;
	streetName: string;
	cityName: string;
	stateName: string;
	streetNumber: number;
	floor?: string;
	apartment?: string;
}

export type UserTokenDecoded = {
	userID: string;
	iat: number;
};

export interface Preference {
	items: [
		{
			title: string;
			description: string;
			picture_url: string;
			unit_price: number;
			currency_id: 'ARS';
			quantity: number;
		},
	];
	payer: {
		phone: { areaCode: string; number: number };
		identification: { type: string; number: string };
		address: AddressInterface;
		email: string;
		name: string;
		surname: string;
	};
	back_urls: {
		success: string;
		pending: string;
		failure: string;
	};
	external_reference: number;
	notification_url: string;
}

export interface ProductInterface {
	fields: {
		title: string;
		description: string;
		images: [{ url: string }];
		stock: boolean;
		unit_price: number;
		quantity: number;
	};
	objectID: string;
}
