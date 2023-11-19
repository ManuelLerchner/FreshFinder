import React from "react";

function hashCode(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

export default function TagCard({ tagname }: { tagname: string }) {
  // get a unique color for each tag

  const colors = [
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#C0C0C0",
    "#808080",
    "#808000",
    "#800080",
    "#008080",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#FFD700",
    "#FFA500",
    "#FFA07A",
    "#FF4500",
    "#FF8C00",
    "#FF7F50",
    "#FF6347",
    "#FF69B4",
  ];

  const hash = hashCode(tagname);

  const color = colors[Math.floor(Math.abs(hash) % colors.length)];

  return (
    <p
      className="bg-white border rounded-full shadow-xl px-4 py-2 text-sm font-semibold hover:scale-[103%]"
      style={{ backgroundColor: color }}
    >
      {tagname}
    </p>
  );
}
