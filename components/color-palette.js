import _ from "lodash";
import cs from "classnames";
import ColorPicker from "./color-picker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colorActions } from "../redux/color/colorSlice";
import { useRouter } from "next/router";

export default function ColorPalette({
  selectedColor,
  setSelectedColor,
  canDraw,
}) {
  const router = useRouter();
  const { pixelSlug } = router.query;
  const dispatch = useDispatch();
  const colors = useSelector((state) => _.get(state.color.colors, pixelSlug));

  const handleNewColor = (hex) => {
    setSelectedColor(hex);
    dispatch(colorActions.addColor({ key: pixelSlug, value: hex }));
  };

  useEffect(() => {
    if (!colors) {
      dispatch(colorActions.setColors({ key: pixelSlug }));
    }
  }, [colors]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {_.map(colors, (color, index) => (
        <button
          disabled={!canDraw}
          key={`${color}-${index}`}
          className={cs([
            "w-8 h-8 md:w-12 md:h-12",
            color === selectedColor &&
              canDraw &&
              "outline outline-4 outline-orange-500",
            !canDraw && "cursor-not-allowed",
          ])}
          style={{ backgroundColor: color }}
          onClick={() => {
            setSelectedColor(color);
          }}
        />
      ))}
      <ColorPicker
        canDraw={canDraw}
        color={selectedColor}
        onChange={handleNewColor}
        colorPaletteSize={_.size(colors)}
      />
    </div>
  );
}
