import React, { Component, useState, useCallback } from 'react';

const AboutTab: React.FC<any> = () => {
    return (
        // <div className='w-[600px] h-[600px] bg-yellow-300'>
        //     <h1>About</h1>
        // </div>
        <div className="p-8 bg-gray-200 rounded-lg shadow-md flex flex-col items-center max-w-screen-md mx-auto dark:bg-gray-800">
  <img className="w-24 h-24 rounded-full mb-4" src="https://via.placeholder.com/150" alt="Profile Picture"/>
  <h2 className="text-2xl font-bold mb-2">John Doe</h2>
  <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu dolor et bibendum. Mauris pharetra urna quis libero. Nunc euismod malesuada sapien, ac commodo enim molestie sit amet. Proin pretium, velit in varius feugiat, risus metus commodo justo, at maximus sapien risus et libero. Vivamus commodo pharetra commodo. Nullam sagittis lorem eget nibh lobortis, nec facilisis risus bibendum. Duis suscipit varius nisi sed gravida.</p>
  <div className="flex flex-row justify-between w-full">
    <div className="w-1/3 h-12 bg-gray-300 rounded-lg"></div>
    <div className="w-1/3 h-12 bg-gray-300 rounded-lg"></div>
    <div className="w-1/3 h-12 bg-gray-300 rounded-lg"></div>
  </div>
  <div className="mt-4 w-500">
    <img className="w-full h-64 rounded-lg" src="https://via.placeholder.com/500" alt="Post Image"/>
    <h3 className="text-xl font-bold mt-4">Post Title</h3>
    <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eu dolor et bibendum. Mauris pharetra urna quis libero. Nunc euismod malesuada sapien, ac commodo enim molestie sit amet. Proin pretium, velit in varius feugiat, risus metus commodo justo, at maximus sapien risus et libero. Vivamus commodo pharetra commodo. Nullam sagittis lorem eget nibh lobortis, nec facilisis risus bibendum. Duis suscipit varius nisi sed gravida.</p>
  </div>
</div>


    )
}
export default AboutTab;
