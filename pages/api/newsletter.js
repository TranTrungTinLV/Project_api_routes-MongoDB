import { connectData, insertDocument } from '../../helpers/data-util';

async function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
            return;
        }

        let client;

        try {
            client = await connectData();
        } catch (err) {
            res.status(500).json({ message: 'Connecting to the database failed!' });
            return;
        }

        try {
            await insertDocument(client, 'newsletter', { email: userEmail });
            setTimeout(() => {client.close()}, 1500)
        } catch (err) {
            res.status(500).json({ message: 'Inserting to the database failed!' });
            return;
        }
        
        console.log(userEmail);
        res.status(201).json({ message: 'Sign In!' })
    }
}
export default handler;