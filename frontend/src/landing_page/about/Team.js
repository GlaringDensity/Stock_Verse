import React from "react";

function Team() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-12">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10 md:p-14 space-y-10 transition-all duration-300 hover:shadow-2xl">
        
        <h1 className="text-5xl font-extrabold text-slate-800 text-center">About us</h1>

        <section className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <p>
            Our website is a centralized platform designed to help businesses and developers manage, monitor, and visualize their operations in real-time. From tracking user activity to analyzing system performance, our dashboard simplifies the way data is consumed and decisions are made.
          </p>

          <p>
            Built with precision and flexibility in mind, the dashboard is crafted using <span className="font-semibold text-blue-600">React</span> and <span className="font-semibold text-blue-600">Tailwind CSS</span>. This ensures a seamless and responsive experience across all modern devices.
          </p>
        </section>

        <section className="bg-slate-50 border-l-4 border-blue-500 px-6 py-6 md:px-10 md:py-8 rounded-xl">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-base">
            <li>Real-time analytics and performance monitoring</li>
            <li>User access control </li>
            <li>Interactive charts, graphs, and reports</li>
            <li>Activity logs, user actions, and security tracking</li>
            <li>Custom widgets for fast insights</li>
            <li>Fully responsive interface with sidebar navigation</li>
          </ul>
        </section>

        <section className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <h2 className="text-2xl font-semibold text-blue-600">Who Is It For?</h2>
          <p>
            Our platform is ideal for tech startups, SaaS platforms, internal business tools, or any team that needs a robust and user-friendly interface for managing data and users. Whether you're a backend developer, operations manager, or support lead — this dashboard equips you with the tools you need to stay on top of your systems.
          </p>
        </section>

        <section className="space-y-4 text-gray-700 text-lg leading-relaxed">
          <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
          <p>
            We aim to bridge the gap between data and decision-making by delivering a dashboard that not only looks great but performs reliably under the hood. Our goal is to make analytics and admin tasks less overwhelming and more empowering.
          </p>
        </section>

        <div className="text-center pt-8">
          <p className="text-xl font-semibold text-slate-800">
            Join us on this journey to better insights.
          </p>
          <p className="text-gray-600">Efficiency starts with clarity — and clarity starts here.</p>
        </div>
      </div>
    </div>
  );
}

export default Team;