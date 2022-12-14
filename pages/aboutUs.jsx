import React from 'react';
import { motion } from 'framer-motion';

export default function aboutUs() {
  return (
    <div className="aboutUs">
      <h1>
        <u className="ZECC-W">ABOUT US:</u>
        <div className="copyright"> ©ZECC-W</div>
      </h1>

      <br />
      <div className="members">
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/zach-byerley/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="https://media-exp1.licdn.com/dms/image/C5603AQHCkceejtIvYQ/profile-displayphoto-shrink_800_800/0/1569367290750?e=1671667200&v=beta&t=PApwrewRWU-IaBiuxtROh4ktw5pGH6O1J91ijFcjB0g"
            />
          </a>
          Zach Byerley
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/echos-echo/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="https://media-exp1.licdn.com/dms/image/D5603AQFkTGcj54Jklw/profile-displayphoto-shrink_800_800/0/1664301549927?e=1671667200&v=beta&t=10f33P6IwDiDGKQYQS9d3YtFopCgu-EBQV22G0b86qc"
            />
          </a>
          Eve Cho
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/echos-echo/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="https://media-exp1.licdn.com/dms/image/D4E03AQEd1PbrhzQXTQ/profile-displayphoto-shrink_800_800/0/1666361287887?e=1671667200&v=beta&t=zKP6JDInajIQNwcYJn9jjFa4S-abXtwiiPV4IaTI8gE"
            />
          </a>
          Cody Chan
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/corygold/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="https://media-exp1.licdn.com/dms/image/C4E03AQFPJ4W5KPQKtQ/profile-displayphoto-shrink_800_800/0/1637612893766?e=1671667200&v=beta&t=h4JX6QE3XegrP2IGDrL4HLmhvSwx1FcJSvbpNdXcSKs"
            />
          </a>
          Cory Gold
        </h3>
        <h3>
          <a target="_blank" href="https://www.linkedin.com/in/thinkingoutlau/">
            <motion.img
              className="memberProfilePic"
              whileHover={{
                scale: 0.9,
              }}
              src="https://iwnfagrreicibkzmwlip.supabase.co/storage/v1/object/sign/aboutus/pic1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYm91dHVzL3BpYzEucG5nIiwiaWF0IjoxNjY2NjI1MTc4LCJleHAiOjE5ODE5ODUxNzh9.IjDmLv7zJzp9URXW0RVoOlPXhsBt8lFIgdG5AOcn7ws"
            />
          </a>
          Winnie Lau
        </h3>
      </div>
      <br />
      <br />

      <h2>
        Github:{' '}
        <u>
          <a target="_blank" href="https://github.com/OG-FSA-2208/Optimate">
            https://github.com/OG-FSA-2208/Optimate
          </a>
        </u>
      </h2>
      <br/>
    </div>
  );
}
