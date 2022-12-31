import { connectData, insertDocument, getAllDocuments } from '../../../helpers/data-util';
async function handler(req, res) {
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectData();
    } catch (err) {
        res.status(500).json({ message: 'Connecting to the database failed!' });
        return;
    }

    if (req.method === 'POST') {
        const { email, text, name } = req.body;


        if (
            !email.includes('@') ||
            !text ||
            text.trim() === '' ||
            !name ||
            name.trim() === ''
        ) {
            res.status(422).json({ message: 'Invalid Input ' });
            client.close();
            return;
        }
        console.log(name, email, text);
        const newComment = {
            email,
            name,
            text,
            eventId
        };

        let result;

        try {
            result = await insertDocument(client, 'comments', newComment);
            newComment._id = result.insertedId;
            res.status(201).json({ message: 'Added Comment', comment: newComment });

        } catch (err) {
            res.status(500).json({ message: 'Inserting comment failed: ' })
        }
        console.log(result);
        console.log(newComment);
    }

    if (req.method === 'GET') {
        try {
            const documents = await getAllDocuments(client, 'comments', { _id: -1 });
            res.status(200).json({ comments: documents })

        } catch (err) {
            res.status(500).json({ message: 'Getting comments failed: ' });
            return;
        }
    }
    client.close();
}
export default handler;


// import {
//     connectData,
//     insertDocument,
//     getAllDocuments,
//   } from '../../../helpers/data-util';
  
//   async function handler(req, res) {
//     const eventId = req.query.eventId;
  
//     let client;
  
//     try {
//       client = await connectData();
//     } catch (error) {
//       res.status(500).json({ message: 'Connecting to the database failed!' });
//       return;
//     }
  
//     if (req.method === 'POST') {
//       const { email, name, text } = req.body;
  
//       if (
//         !email.includes('@') ||
//         !name ||
//         name.trim() === '' ||
//         !text ||
//         text.trim() === ''
//       ) {
//         res.status(422).json({ message: 'Invalid input.' });
//         client.close();
//         return;
//       }
  
//       const newComment = {
//         email,
//         name,
//         text,
//         eventId,
//       };
  
//       let result;
  
//       try {
//         result = await insertDocument(client, 'comments', newComment);
//         newComment._id = result.insertedId;
//         res.status(201).json({ message: 'Added comment.', comment: newComment });
//       } catch (error) {
//         res.status(500).json({ message: 'Inserting comment failed!' });
//       }
//     }
  
//     if (req.method === 'GET') {
//       try {
//         const documents = await getAllDocuments(client, 'comments', { _id: -1 });
//         res.status(200).json({ comments: documents });
//       } catch (error) {
//         res.status(500).json({ message: 'Getting comments failed.' });
//       }
//     }
  
//     client.close();
//   }
  
//   export default handler;