import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Category from "../components/Category";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import Events from "../components/Events";

import clientPromise from "../lib/mongodb";

export default function Home({ events }) {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(async () => {
//     // add your Realm App Id to the .env.local file
//     const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
//     const app = new Realm.App({ id: REALM_APP_ID });
//     const credentials = Realm.Credentials.anonymous();
//     try {
//       const user = await app.logIn(credentials);
//       const allProducts = await user.functions.getAllProducts();
//       setProducts(() => allProducts);
//       const uniqueCategories = await user.functions.getUniqueCategories();
//       setCategories(() => uniqueCategories);
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>GDELT Hackathon UX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white w-full min-h-screen">
        {/* <Header /> */}
        <Container>
          <Hero />
          {/* <Category
            category="Recent Events"
            // categories={categories}
            productCount={`${events.length} Products`}
          /> */}
          <Events events={events} />
          {/* <Pagination /> */}
        </Container>
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.NEXT_ATLAS_DATABASE);
        const collection = db.collection(process.env.NEXT_ATLAS_COLLECTION);
        const events = await collection.find({}).limit(10).toArray();

        return {
            props: {
                isConnected: true,
                events: JSON.parse(JSON.stringify(events)),
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: {
                isConnected: false
            }
        }
    }
}