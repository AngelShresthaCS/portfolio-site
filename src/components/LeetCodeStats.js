import React from "react";
import "./LeetCodeStats.css";

const USERNAME = "angelshresthacs";

const LeetCodeCard = () => {
  return (
    <section id="leetcode" className="leetcode">
      <div className="leetcode-container">
        <h2 className="leetcode-title">LeetCode</h2>

        <div className="leetcode-card">
          <img
            src={`https://leetcard.jacoblin.cool/${USERNAME}?theme=dark&font=Inter`}
            alt="LeetCode Stats"
          />
        </div>
        <p><a href={`https://leetcode.com/${USERNAME}`} target="_blank" rel="noopener noreferrer">View Profile on LeetCode</a></p>
      </div>
    </section>
  );
};

export default LeetCodeCard;
