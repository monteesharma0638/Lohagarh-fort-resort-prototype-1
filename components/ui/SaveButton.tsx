// components/SaveButton.js
"use client";

export default function SaveButton({ path }: any) {
  const handleSave = async () => {
    // const newValue = document.getElementById('data-input').value;
    
    // const res = await fetch('/api/hotel/update', {
    //   method: 'POST',
    //   body: JSON.stringify({ path, newValue }),
    // });

    // if (res.ok) alert("Saved successfully!");
  };

  return (
    <button 
      onClick={handleSave}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Save Changes
    </button>
  );
}