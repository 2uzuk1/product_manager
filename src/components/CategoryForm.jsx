import { useState } from "react";
import Button from "./Button";

const CategoryForm = () => {
  const [textValue, setTextValue] = useState("");
  const [textError, setTextError] = useState("");
  const [textLoading, setTextLoading] = useState(false);

  const handleTextSubmit = async (event) => {
    event.preventDefault();
    if (textLoading) return;

    try {
      setTextError("");
      setTextLoading(true);
      const response = await fetch("http://localhost:8000/categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: textValue }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(`${data.detail}`);
      console.log(data);
      setTextValue("");
    } catch (err) {
      console.log(err.message);
      setTextError(err.message);
    } finally {
      setTextLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleTextSubmit}
        className="flex gap-2 justify-center items-center"
      >
        <input
          type="text"
          value={textValue}
          aria-label="text input"
          onChange={(event) => setTextValue(event.target.value)}
        />
        {textLoading ? (
          <div className="animate-spin border-2 border-border w-8 h-8 rounded-full border-t-primary"></div>
        ) : (
          <Button type="submit">Save</Button>
        )}
      </form>
      <div className="flex flex-col justify-center">
        {textError !== "" && <p className="p-2">{textError}</p>}
      </div>
    </div>
  );
};

export default CategoryForm;
