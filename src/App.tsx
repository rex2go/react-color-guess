import { useEffect, useMemo, useState } from "react";
import "./App.scss";

type GameStateType = "INGAME" | "ENDING"

const App = () => {
  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [activeColor, setActiveColor] = useState<string>();
  const [colorOptions, setColorOptions] = useState<string[]>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [gameState, setGameState] = useState<GameStateType>("INGAME");

  const resetGame = () => {
    const color = randomColor();
    const colorOptions = [randomColor(), randomColor(), randomColor()];
    colorOptions[Math.floor(Math.random() * 3)] = color;

    setActiveColor(color);
    setColorOptions(colorOptions);
    setSelectedColor("");
    setGameState("INGAME");
  }

  const selectColor = (color: string) => {
    if (gameState === "ENDING") return;

    if (color === selectedColor) {
      submitColor();
      return;
    }

    setSelectedColor(color);
  }

  const submitColor = () => {
    setGameState("ENDING");

    setTimeout(resetGame, 2000);
  }

  const options = useMemo(() => colorOptions?.map((colorOption, index) => {
    const isSelected = selectedColor === colorOption;
    const isCorrect = gameState === "ENDING" && activeColor === colorOption;
    const isDisabled = gameState === "ENDING";

    return <button className={`color-option ${isSelected ? "color-option--selected" : ""} ${isCorrect ? "color-option--correct" : ""} ${isDisabled ? "color-option--disabled" : ""}`} key={index} value={colorOption} onClick={() => selectColor(colorOption)}><code>{colorOption}</code></button>
  }), [colorOptions, selectedColor, gameState]);

  useEffect(() => {
    resetGame();
  }, []);

  const colorVariable = { "--active-color": activeColor } as React.CSSProperties;

  return (
    <div className="app" style={colorVariable}>
      <h1 className="headline">React Color Guess</h1>
      <span className="subline">Example by <a href="https://github.com/rex2go">@rex2go</a></span>

      <div className="color-wrapper">
        <div className="color-preview" title="Color Preview"></div>

        <div className="color-options">
          {options}
        </div>
      </div>

      <div className={`hint ${selectedColor && gameState === "INGAME" ? "" : "hidden"}`}>Press again to submit</div>
    </div>
  );
}

export default App;
