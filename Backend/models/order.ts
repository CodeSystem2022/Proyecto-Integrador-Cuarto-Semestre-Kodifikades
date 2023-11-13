import mongoose, { Schema, model } from 'mongoose';
import { OrderInterface } from 'lib/types';

const orderSchema = new Schema<OrderInterface>({
	userID: { type: String, required: [true, 'Debes ingresar el id del usuario.'] },
	status: {
		type: String,
		required: [true, 'Debes ingresar el status del pedido.'],
		default: 'pending',
	},
	productsIDs: { type: [String], required: [true, 'Debes ingresar el id del producto.'] },
	productDetails: { type: Object, required: [true, 'Debes ingresar una descripcion.'] },
});
orderSchema;
orderSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export default (mongoose.models.Order as mongoose.Model<OrderInterface>) ||
	model<OrderInterface>('Order', orderSchema);
