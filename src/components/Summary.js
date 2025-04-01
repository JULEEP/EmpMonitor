import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const Summary = () => {
  const [users] = useState([
    { id: 1, name: "A Rami", color: "red", avatarText: "AR" },
    { id: 2, name: "Aditi S", color: "orange", avatarText: "AS" },
    { id: 3, name: "Anoop K", color: "blue", avatarText: "AK" },
    { id: 4, name: "Charlie Johnson", color: "purple", avatarText: "CJ" },
    { id: 5, name: "David Linsec", color: "green", avatarText: "DL" },
    { id: 6, name: "Ian Corby", color: "pink", avatarText: "IC" },
    { id: 7, name: "Kristina Kumar", color: "teal", avatarText: "KK" },
    { id: 8, name: "Laria Farr", color: "yellow", avatarText: "LF" },
    { id: 9, name: "Malik Khan", color: "indigo", avatarText: "MK" },
    { id: 10, name: "Neha Powell", color: "erald", avatarText: "NP" },
    { id: 11, name: "Naveen Kumar", color: "cyan", avatarText: "NK" },
    { id: 12, name: "Sami Nadeem", color: "bgray", avatarText: "SN" },
  ]);

  // Pie Chart for Color Distribution
  const colorDistribution = users.map((user) => user.color);
  const colorCount = [...new Set(colorDistribution)].map(
    (color) => colorDistribution.filter((c) => c === color).length
  );

  const colorData = {
    labels: [...new Set(colorDistribution)],
    datasets: [
      {
        data: colorCount,
        backgroundColor: [...new Set(colorDistribution)].map(
          (color, index) => `hsl(${(index * 30) % 360}, 70%, 50%)`
        ),
        hoverOffset: 4,
      },
    ],
  };

  // Pie Chart for Initial Distribution
  const avatarTextDistribution = users.map((user) => user.avatarText);
  const avatarTextCount = [...new Set(avatarTextDistribution)].map(
    (text) => avatarTextDistribution.filter((t) => t === text).length
  );

  const avatarTextData = {
    labels: [...new Set(avatarTextDistribution)],
    datasets: [
      {
        data: avatarTextCount,
        backgroundColor: [...new Set(avatarTextDistribution)].map(
          (text, index) => `hsl(${(index * 30) % 360}, 70%, 50%)`
        ),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Centered Main Heading Changed to Summary */}
      <h2
        style={{
          backgroundColor: "#333",
          color: "white",
          padding: "10px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Summary
      </h2>

      {/* Row for Pie Charts */}
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        {/* Pie Chart for Color Distribution */}
        <div style={{ width: "45%", marginBottom: "20px" }}>
          <h3
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "5px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Color Distribution
          </h3>
          <div
            style={{
              width: "350px", // Explicit width
              height: "350px", // Explicit height
              margin: "0 auto",
            }}
          >
            <Doughnut data={colorData} />
          </div>
        </div>

        {/* Pie Chart for Initial Distribution */}
        <div style={{ width: "45%", marginBottom: "20px" }}>
          <h3
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "5px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Initial Distribution
          </h3>
          <div
            style={{
              width: "350px", // Explicit width
              height: "350px", // Explicit height
              margin: "0 auto",
            }}
          >
            <Doughnut data={avatarTextData} />
          </div>
        </div>
      </div>

      {/* Row for Tables */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", flexWrap: "wrap" }}>
        {/* Table for User Information */}
        <div style={{ width: "32%", marginBottom: "20px" }}>
          <h3
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "5px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            User Information
          </h3>
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}
          >
            <thead>
              <tr>
                <th style={{ padding: "8px", textAlign: "left" }}>ID</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Color</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Avatar Text</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: "8px" }}>{user.id}</td>
                  <td style={{ padding: "8px" }}>{user.name}</td>
                  <td style={{ padding: "8px" }}>{user.color}</td>
                  <td style={{ padding: "8px" }}>{user.avatarText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table for Color Count */}
        <div style={{ width: "32%", marginBottom: "20px" }}>
          <h3
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "5px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            User Count by Color
          </h3>
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}
          >
            <thead>
              <tr>
                <th style={{ padding: "8px", textAlign: "left" }}>Color</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {colorData.labels.map((color, index) => (
                <tr key={color}>
                  <td style={{ padding: "8px" }}>{color}</td>
                  <td style={{ padding: "8px" }}>{colorCount[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table for Initial Count */}
        <div style={{ width: "32%", marginBottom: "20px" }}>
          <h3
            style={{
              backgroundColor: "#333",
              color: "white",
              padding: "5px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            User Count by Initials
          </h3>
          <table
            border="1"
            style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}
          >
            <thead>
              <tr>
                <th style={{ padding: "8px", textAlign: "left" }}>Avatar Text</th>
                <th style={{ padding: "8px", textAlign: "left" }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {avatarTextData.labels.map((text, index) => (
                <tr key={text}>
                  <td style={{ padding: "8px" }}>{text}</td>
                  <td style={{ padding: "8px" }}>{avatarTextCount[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Summary;