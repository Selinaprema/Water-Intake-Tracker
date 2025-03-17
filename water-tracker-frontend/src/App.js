import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

// Water Intake Form Component
function WaterIntakeForm({
  onAddWaterIntake,
  onEditWaterIntake,
  editingIntake,
}) {
  const [amount, setAmount] = useState(
    editingIntake ? editingIntake.amount : ""
  );

  const handleAddWaterIntake = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    const intakeAmount = parseInt(amount, 10);
    try {
      const { data } = await axios.post("http://localhost:8080/api/water", {
        amount: intakeAmount,
      });
      onAddWaterIntake(data);
      setAmount("");
    } catch (error) {
      console.error("Error adding water intake:", error);
    }
  };

  const handleEditWaterIntake = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return;

    const intakeAmount = parseInt(amount, 10);
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/water/${editingIntake.id}`,
        { amount: intakeAmount }
      );
      onEditWaterIntake(data);
      setAmount("");
    } catch (error) {
      console.error("Error updating water intake:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingIntake ? "Edit Water Intake" : "Add Water Intake"}</h2>
      <form
        onSubmit={editingIntake ? handleEditWaterIntake : handleAddWaterIntake}
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (in ml)"
          required
        />
        <button type="submit">
          {editingIntake ? "Update Intake" : "Add Intake"}
        </button>
      </form>
    </div>
  );
}

// Main App Component
function App() {
  const [waterIntakes, setWaterIntakes] = useState([]);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [editingIntake, setEditingIntake] = useState(null);

  useEffect(() => {
    const fetchWaterIntakes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/water");
        setWaterIntakes(response.data);
        const totalConsumed = response.data.reduce(
          (total, intake) => total + intake.amount,
          0
        );
        setWaterConsumed(totalConsumed);
      } catch (error) {
        console.error("Error fetching water intakes:", error);
      }
    };
    fetchWaterIntakes();
  }, []);

  const handleAddWaterIntake = (newIntake) => {
    setWaterIntakes([...waterIntakes, newIntake]);
    setWaterConsumed(waterConsumed + newIntake.amount);
  };

  const handleEditWaterIntake = (updatedIntake) => {
    const updatedWaterIntakes = waterIntakes.map((intake) =>
      intake.id === updatedIntake.id ? updatedIntake : intake
    );
    setWaterIntakes(updatedWaterIntakes);
    const totalConsumed = updatedWaterIntakes.reduce(
      (total, intake) => total + intake.amount,
      0
    );
    setWaterConsumed(totalConsumed);
    setEditingIntake(null);
  };

  const handleDeleteWaterIntake = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/water/${id}`);
      setWaterIntakes(waterIntakes.filter((intake) => intake.id !== id));
      const totalConsumed = waterIntakes.reduce(
        (total, intake) => total + intake.amount,
        0
      );
      setWaterConsumed(totalConsumed);
    } catch (error) {
      console.error("Error deleting water intake:", error);
    }
  };

  return (
    <div className="App">
      <div className="main-container">
        {/* Top Row (Title) */}
        <div className="top-row">
          <h1>Water Intake Tracker</h1>
        </div>

        {/* Bottom Row (Two Columns) */}
        <div className="bottom-row">
          {/* Left Column */}
          <div className="left-column">
            <WaterIntakeForm
              onAddWaterIntake={handleAddWaterIntake}
              onEditWaterIntake={handleEditWaterIntake}
              editingIntake={editingIntake}
            />
            <ul>
              {waterIntakes.map((intake) => (
                <li key={intake.id}>
                  {intake.amount} ml
                  <button onClick={() => setEditingIntake(intake)}>Edit</button>
                  <button onClick={() => handleDeleteWaterIntake(intake.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <h2>Water Consumption</h2>
            <div className="person-outline">
              {/* SVG Outline with Dynamic Water Fill */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 200"
                width="200"
                height="300"
              >
                <g id="body-outline">
                  {/* Head */}
                  <circle
                    cx="50"
                    cy="30"
                    r="15"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Body */}
                  <rect
                    x="30"
                    y="50"
                    width="40"
                    height="100"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Arms */}
                  <line
                    x1="30"
                    y1="50"
                    x2="10"
                    y2="70"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <line
                    x1="70"
                    y1="50"
                    x2="90"
                    y2="70"
                    stroke="black"
                    strokeWidth="2"
                  />
                  {/* Legs */}
                  <line
                    x1="40"
                    y1="150"
                    x2="40"
                    y2="180"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <line
                    x1="60"
                    y1="150"
                    x2="60"
                    y2="180"
                    stroke="black"
                    strokeWidth="2"
                  />
                </g>

                {/* Water Fill */}
                <g id="water-fill" fill="blue" opacity="0.5">
                  <rect
                    x="30"
                    y={50 + (100 - (waterConsumed / 2000) * 100)} // Calculate dynamic fill based on water consumed
                    width="40"
                    height={(waterConsumed / 2000) * 100} // Dynamic height
                  />
                </g>

                {/* Text for Water Percentage */}
                <text
                  id="water-percentage"
                  x="50"
                  y="200"
                  textAnchor="middle"
                  fontSize="16"
                  fill="black"
                >
                  {Math.min(Math.round((waterConsumed / 2000) * 100), 100)}%
                </text>
              </svg>
            </div>

            <div className="progress-container">
              <div
                className="progress-fill"
                style={{
                  width: `${(waterConsumed / 2000) * 100}%`,
                }}
              ></div>
            </div>
            <p>
              {waterConsumed >= 2000
                ? "Congratulations, you've reached your 2L daily goal!"
                : `You need ${
                    2000 - waterConsumed
                  } ml more to reach your goal!`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
