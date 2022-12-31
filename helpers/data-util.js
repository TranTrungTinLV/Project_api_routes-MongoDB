// import { MongoClient } from 'mongodb';
// export async function connectData() {
//     const client = await MongoClient.connect('mongodb+srv://tintran:2xcVylbBpStyDSgx@cluster0.ek232vn.mongodb.net/events?retryWrites=true&w=majority');
//     return client;
// }

// export async function insertDocument(client, document) {
//     const db = client.db();
//     await db.collection(collection).insertOne(document);
// }

// export async function getAllDocuments(client, collection, sort) {
//         const db = client.db();
//         const documents = await db
//             .collection(collection)
//             .find()
//             .sort(sort)
//             .toArray();
//         return documents;
// }
import { MongoClient } from 'mongodb';

export async function connectData() {
  const client = await MongoClient.connect(
    'mongodb+srv://tintran:2xcVylbBpStyDSgx@cluster0.ek232vn.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}