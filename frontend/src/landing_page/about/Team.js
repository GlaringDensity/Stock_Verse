import React from "react";

function Team() {
  const styles = {
    outer: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #f1f5f9, #e2e8f0)",
      padding: "48px 16px",
      fontFamily: `"Inter", sans-serif`,
    },
    inner: {
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      borderRadius: "24px",
      padding: "56px",
      transition: "box-shadow 0.3s ease",
    },
    heroImage: {
      width: "100%",
      height: "260px",
      objectFit: "cover",
      borderRadius: "16px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    },
    title: {
      fontSize: "48px",
      fontWeight: 800,
      color: "#1e293b",
      textAlign: "center",
      margin: "32px 0",
      textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
    },
    section: {
      color: "#374151",
      fontSize: "18px",
      lineHeight: 1.6,
      marginBottom: "32px",
    },
    featuresSection: {
      display: "flex",
      alignItems: "flex-start",
      gap: "24px",
      backgroundColor: "#f8fafc",
      borderLeft: "4px solid #3b82f6",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    featuresImage: {
      flex: "1 1 200px",
      width: "100%",
      height: "180px",
      objectFit: "cover",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
    },
    h2: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#3b82f6",
      marginBottom: "16px",
    },
    list: {
      margin: 0,
      paddingLeft: "20px",
      color: "#374151",
      fontSize: "18px",
      lineHeight: 1.6,
    },
    flexSection: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
      marginBottom: "32px",
      flexWrap: "wrap",
    },
    missionImage: {
      flex: "1 1 200px",
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
    },
    marketSection: {
      marginBottom: "32px",
    },
    marketImage: {
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "12px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
      marginBottom: "16px",
    },
    closing: {
      textAlign: "center",
      paddingTop: "32px",
      borderTop: "1px solid #e5e7eb",
      color: "#1e293b",
    },
    closingSub: {
      color: "#4b5563",
      fontStyle: "italic",
      marginTop: "8px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.outer}>
      <div
        style={styles.inner}
        onMouseEnter={e =>
          (e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.15)")
        }
        onMouseLeave={e =>
          (e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)")
        }
      >
        

        <h1 style={styles.title}>About Us</h1>

        {/* Intro */}
        <section style={styles.section}>
          <p>
            Welcome to our Dashboard Platform—a single pane of glass for
            monitoring, managing, and visualizing your data in real time. We
            empower teams with instant insights, so you can make smarter
            decisions faster.
          </p>
        </section>

        {/* Key Features */}
        <div style={styles.featuresSection}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h2 style={styles.h2}>Key Features</h2>
            <ul style={styles.list}>
              <li>Real-time analytics & performance metrics</li>
              <li>Fine-grained user access control</li>
              <li>Interactive charts, graphs & downloadable reports</li>
              <li>Comprehensive activity logs & security tracking</li>
              <li>Customizable widgets for quick insights</li>
              <li>Responsive layout with collapsible navbar</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80"
            alt="Analytics charts"
            style={styles.featuresImage}
          />
        </div>

        {/* Market Insights */}
        <section style={styles.marketSection}>
          <h2 style={styles.h2}>Market Insights</h2>
          
          <ul style={styles.list}>
            <li>S&P 500: +0.8% today</li>
            <li>NASDAQ Composite: +1.2% today</li>
            <li>Dow Jones Industrial: +0.6% today</li>
            <li>Top Gainers: AAPL, MSFT, TSLA</li>
            <li>Top Losers: AMZN, GOOGL, FB</li>
          </ul>
        </section>

        {/* Mission */}
        <div style={styles.flexSection}>
          
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h2 style={styles.h2}>Our Mission</h2>
            <p style={{ color: "#374151", fontSize: "18px", lineHeight: 1.6 }}>
              We bridge the gap between raw data and actionable insights. By
              combining elegant design with rock-solid performance, our goal is
              to make analytics and admin tasks not just manageable—but
              downright enjoyable.
            </p>
          </div>
        </div>

        {/* Closing CTA */}
        <div style={styles.closing}>
          <p style={{ fontSize: "20px", fontWeight: 600 }}>
            Join us on this journey to better insights.
          </p>
          <p style={styles.closingSub}>
            Efficiency starts with clarity — and clarity starts here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
