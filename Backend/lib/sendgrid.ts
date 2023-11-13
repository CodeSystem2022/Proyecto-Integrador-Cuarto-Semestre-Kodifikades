import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function sendCode(
	userEmail: string,
	code: string,
): Promise<void | { Message: string }> {
	const msg = {
		to: userEmail, // Change to your recipient
		from: 'lucasmruiz05@gmail.com', // Change to your verified sender
		subject: 'CODIGO',
		text: code,
		html: `<strong>${code}</strong>`,
	};
	return sgMail
		.send(msg)
		.then(() => {
			return { Message: 'Email sent' };
		})
		.catch((error) => {
			console.error(error);
		});
}

export async function sendOrderEmail(userEmail, productDetails) {
	try {
		const msg = {
			to: userEmail,
			from: 'lucasmruiz05@gmail.com',
			subject: 'Factura de compra.',
			text: 'Orden de compra.',
			html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>¡Ya está listo el detalle de tu compra!</h1>
          ${productDetails
						.map(
							(product) => `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
              <img src="${product.picture_url}" alt="${product.title}" style="max-width: 100%;">
              <h2>${product.title}</h2>
              <p>${product.description}</p>
              <p>Precio unitario: ${product.unit_price} ${product.currency_id}</p>
            </div>
          `,
						)
						.join('')}
        </div>
      `,
		};
		await sgMail.send(msg);
		console.log('Email sent');
	} catch (error) {
		console.error(error);
	}
}
