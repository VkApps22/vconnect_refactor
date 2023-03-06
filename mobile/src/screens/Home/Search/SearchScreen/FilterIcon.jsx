import React from 'react';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M.5 12.167v1.666h5v-1.666h-5zm0-10v1.666h8.333V2.167H.5zM8.833 15.5v-1.667H15.5v-1.666H8.833V10.5H7.167v5h1.666zm-5-10v1.667H.5v1.666h3.333V10.5H5.5v-5H3.833zM15.5 8.833V7.167H7.167v1.666H15.5zm-5-3.333h1.667V3.833H15.5V2.167h-3.333V.5H10.5v5z"
      fill="#fff"
    />
  </Svg>
);

export default FilterIcon;
