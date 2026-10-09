import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { profile } from '../data/portfolio';

export default function LeetCodeStats() {
  const username = profile.leetcodeUsername;
  const [failedUsername, setFailedUsername] = useState(null);
  const unavailable = failedUsername === username;

  return (
    <section id="leetcode" aria-labelledby="leetcode-heading">
      <div className="section-heading">
        <p className="eyebrow">LeetCode</p>
        <h2 id="leetcode-heading">A little problem-solving</h2>
      </div>
      <div className="leetcode-layout">
        <div className="leetcode-copy">
          <p className="lead">Problem-solving practice, with statistics from my LeetCode profile.</p>
          <p className="leetcode-username"><SiLeetcode aria-hidden="true" /> @{username}</p>
          <a className="button secondary" href={`https://leetcode.com/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer">View LeetCode profile <FaArrowRight aria-hidden="true" /></a>
        </div>
        <div className="leetcode-card">
          {unavailable ? (
            <p className="leetcode-fallback" role="status">The stats card is temporarily unavailable. Visit my LeetCode profile to see the latest statistics.</p>
          ) : (
            <img
              src={`https://leetcard.jacoblin.cool/${encodeURIComponent(username)}?theme=dark&font=Inter`}
              alt={`LeetCode statistics for ${username}`}
              width="500" height="200" loading="lazy" decoding="async"
              onError={() => setFailedUsername(username)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
