import React from "react";
const FooterButton: React.FC<{text: string}> = ({text}) => {
  return <button className="text-gray-600 px-3 py-2"> {text} </button>;
};

const Texts = [
"Help", "Status", "About", "Careers", "Blog", "Privacy", "Terms", "Text to speech", "Team"
];

export default function Footer() {
  return (
    <div className="max-w-lg">
    {Texts.map((text, index) => (
        <FooterButton key={index} text = {text}></FooterButton>
    ))}
    </div>
  );
}
