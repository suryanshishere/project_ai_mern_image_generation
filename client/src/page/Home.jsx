import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';
import { Link } from 'react-router-dom';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
 
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Ask & Learn</h1>
        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Ask to YOUR AI FRIEND</Link>      </div>
    </section>
  );
};

export default Home;
