import mercadopago from 'mercadopago';
mercadopago.configure({
	access_token: process.env.MP_TOKEN,
});

export async function getMerchantOrder(id: string) {
	try {
		const res = await mercadopago.merchant_orders.get(id);
		return res.body;
	} catch (e) {
		throw new Error('Error in the mercadopago lib.', e);
	}
}

export async function createPreference(preference) {
	try {
		const res = await mercadopago.preferences.create(preference);
		return res.body['init_point'];
	} catch (error) {
		console.error({ Message: 'Error at create preference', Error: error.message });
		throw error;
	}
}
