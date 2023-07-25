import { createSelector } from '@reduxjs/toolkit';
import { stateSelector } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import { defaultSelectorOptions } from 'app/store/util/defaultMemoizeOptions';
import IAISlider from 'common/components/IAISlider';
import { setRefinerAestheticScore } from 'features/sdxl/store/sdxlSlice';
import { memo, useCallback } from 'react';

const selector = createSelector(
  [stateSelector],
  ({ sdxl, hotkeys }) => {
    const { refinerAestheticScore, isRefinerAvailable } = sdxl;
    const { shift } = hotkeys;

    return {
      isRefinerAvailable,
      refinerAestheticScore,
      shift,
    };
  },
  defaultSelectorOptions
);

const ParamSDXLRefinerAestheticScore = () => {
  const { refinerAestheticScore, shift, isRefinerAvailable } =
    useAppSelector(selector);
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    (v: number) => dispatch(setRefinerAestheticScore(v)),
    [dispatch]
  );

  const handleReset = useCallback(
    () => dispatch(setRefinerAestheticScore(6)),
    [dispatch]
  );

  return (
    <IAISlider
      label="Aesthetic Score"
      step={shift ? 0.1 : 0.5}
      min={1}
      max={10}
      onChange={handleChange}
      handleReset={handleReset}
      value={refinerAestheticScore}
      sliderNumberInputProps={{ max: 10 }}
      withInput
      withReset
      withSliderMarks
      isInteger={false}
      isDisabled={!isRefinerAvailable}
    />
  );
};

export default memo(ParamSDXLRefinerAestheticScore);
