import dbConnect from 'lib/connection';
import Order from 'models/order';
import { findUserByID } from 'controllers/user';
import { Preference, UserInterface } from 'lib/types';
import { createPreference, getMerchantOrder } from 'lib/mercadopago';
import { sendOrderEmail } from 'lib/sendgrid';

function createPreferenceStructure(userData: UserInterface, items, orderID) {
	const { phone, identification, address, email, name, surname } = userData;
	const preference: Preference = {
		items,
		payer: {
			phone,
			identification,
			address,
			email,
			name,
			surname,
		},
		back_urls: {
			success: 'https://ecommerce-front-sage-three.vercel.app/pay/success',
			pending: 'https://ecommerce-front-sage-three.vercel.app/pay/pending',
			failure: 'https://ecommerce-front-sage-three.vercel.app/pay/failure',
		},
		external_reference: orderID,
		notification_url: 'https://crud-nextjs-ts.vercel.app/api/webhooks/mercadopago?',
	};
	return preference;
}

export async function createOrderDB(userData: UserInterface, productData, productsIDs: string[]) {
	await dbConnect();
	try {
		const items = productData.results.map((product) => {
			const { title, description, images, unit_price } = product.fields;
			return {
				title,
				description,
				picture_url: images[0].url,
				unit_price,
				currency_id: 'ARS',
				quantity: 1,
			};
		});
		const newOrder = new Order({
			userID: userData.id,
			productID: productsIDs,
			productDetails: items,
			status: 'pending',
		});
		const orderSaved = await newOrder.save();
		const orderID: string = orderSaved.id;
		const preferenceStructure = createPreferenceStructure(userData, items, orderID);
		const urlToRedirect = await createPreference(preferenceStructure);
		return { orderID, urlToRedirect };
	} catch (error) {
		console.error({ Message: 'Error to create order', Error: error });
		throw error;
	}
}

export async function changeOrderStatusAndNotifyUser(id: string, topic: string) {
	await dbConnect();
	try {
		if (topic === 'merchant_order') {
			const order = await getMerchantOrder(id);
			const orderStatus = order.order_status;
			if (orderStatus === 'paid') {
				const orderID = order.external_reference;
				const updatedOrderDB = await Order.findByIdAndUpdate(
					orderID,
					{ status: orderStatus },
					{
						returnDocument: 'after',
					},
				);
				const { userID, productDetails } = updatedOrderDB;
				const user = await findUserByID(userID);
				await sendOrderEmail(user.email, productDetails);
			}
		}
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}

export async function getMyOrders(userID: string) {
	await dbConnect();
	try {
		const orders = await Order.find({ userID }).exec();
		return orders;
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}

export async function getOrder(id: string) {
	await dbConnect();
	try {
		return await Order.findById(id);
	} catch (error) {
		console.error({ Message: 'Error to change order status and notify user', Error: error });
		throw error;
	}
}
